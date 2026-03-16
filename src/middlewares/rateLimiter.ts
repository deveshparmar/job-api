import type { Request, Response, NextFunction } from "express";
import { redis } from "../redis/index.js";

const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_REQUESTS = 100;

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const key = `rate_limit:${req.ip}`;
    const count = await redis.incr(key);

    if (count == 1) await redis.expire(key, WINDOW_SIZE_IN_SECONDS);

    if (count > MAX_REQUESTS) {
        return res.status(429).json({ error: "Too many requests" });
    }
    next();
}