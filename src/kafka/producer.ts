import { config } from "../config/index.js";
import { consumer } from "./client.js";

export async function startConsumer() {
    await consumer.connect();

    await consumer.subscribe({ topic: config.KAFKA_TOPIC || "jobs-topic", fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const jobId = message.value?.toString();
            console.log(
                `Received job event: ${jobId} | Partition: ${partition} | Offset: ${message.offset}`
            );
        },
    });
}
