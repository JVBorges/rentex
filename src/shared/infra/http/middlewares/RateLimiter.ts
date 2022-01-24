import { NextFunction, Request, Response } from "express";
import * as redis from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { AppError } from "../../../errors/AppError";

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 10,
  duration: 5,
});

export default async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(req.ip);
    return next();
  } catch (e) {
    throw new AppError("Too many requests", 429);
  }
}