import express from "express";
import { config } from "./config/index.js";
import router from "./routes/index.js";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import { connectProducer, producer } from "./kafka/client.js";
import { publishOutboxEvents } from "./outbox/publisher.js";
import { rateLimiter } from "./middlewares/rateLimiter.js";

const app = express();

app.use(express.json());
app.use(rateLimiter);

app.use("/api", router);

app.use(globalErrorHandler);

const PORT = config.PORT || 8000;

connectProducer();

setInterval(() => {
    publishOutboxEvents();
}, 3000);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
