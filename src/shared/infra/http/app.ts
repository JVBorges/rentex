import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import createConnection from "../typeorm";
import "../../container";

import { AppError } from "../../errors/AppError";
import { router } from "./routes";
import swaggerFile from "../../../swagger.json";
import upload from "../../../config/upload";
import rateLimiter from "./middlewares/RateLimiter";

createConnection();
const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use(morgan('dev'));

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: `Internal server error - ${err.message}` });
})

export { app };