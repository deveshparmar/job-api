import pool from "../db/client.js";
import { producer } from "../kafka/client.js";
import { config } from "../config/index.js";
import { JOB_QUERIES } from "../dal/sqlQueries.js";

export async function publishOutboxEvents() {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    const result = await client.query(JOB_QUERIES.GET_JOB_OUTBOX_EVENT);

    for (const event of result.rows) {

      await producer.send({
        topic: config.KAFKA_TOPIC || "jobs-topic",
        messages: [
          {
            key: event.aggregate_id,
            value: JSON.stringify(event.payload)
          }
        ]
      });

      await client.query(
        JOB_QUERIES.UPDATE_JOB_OUTBOX_EVENT,
        [event.id]
      );
    }

    await client.query("COMMIT");

  } catch (err) {

    await client.query("ROLLBACK");
    console.error("Outbox publish error", err);

  } finally {

    client.release();

  }
}
