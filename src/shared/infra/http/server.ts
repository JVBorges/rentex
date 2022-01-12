import "reflect-metadata";
import dotenv from "dotenv"
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan"

import createConnection from "../typeorm";
import "../../container";

import { AppError } from "../../errors/AppError";
import { router } from "./routes";
import swaggerFile from "../../../swagger.json";

dotenv.config();
createConnection();
const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: `Internal server error - ${err.message}` });
})

app.listen(3000, () => console.log('Server running on port 3000'));
