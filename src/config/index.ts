import dotenv from "dotenv";
dotenv.config();

export const config = {
    PORT:process.env.PORT,
    DB_HOST:process.env.DB_HOST,
    DB_NAME:process.env.DB_NAME,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_PORT:process.env.DB_PORT,
    DB_USER:process.env.DB_USER,
    DB_IDLE_TIMEOUT_MS:process.env.DB_IDLE_TIMEOUT_MS,
    DB_CONNECTION_TIMEOUT_MS:process.env.DB_CONNECTION_TIMEOUT_MS,
    DB_MAX_CONNECTIONS:process.env.DB_MAX_CONNECTIONS,
    KAFKA_BROKER:process.env.KAFKA_BROKER,
    KAFKA_TOPIC:process.env.KAFKA_TOPIC,
    KAFKA_GROUP_ID:process.env.KAFKA_GROUP_ID,
    NODE_ENV:process.env.NODE_ENV,
};