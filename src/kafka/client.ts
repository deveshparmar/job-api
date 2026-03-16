import { Kafka } from "kafkajs";
import { config } from "../config/index.js";

export const kafka = new Kafka({
  brokers: [config.KAFKA_BROKER || "localhost:9092"],
})


export const producer = kafka.producer();

export const consumer = kafka.consumer({ groupId: config.KAFKA_GROUP_ID || "jobs-group" });

export async function connectProducer() {
  await producer.connect();
  console.log("Kafka Producer Connected");
}

export async function publishJob(jobId: string) {
  await producer.send({
    topic: config.KAFKA_TOPIC || "jobs",
    messages: [{ key: jobId, value: JSON.stringify({ event: "JOB_CREATED", jobId }) }],
  });
}
