import "reflect-metadata";
import dotenv from "dotenv"
import express from "express";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan"

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./database";
import "./shared/container";

dotenv.config();
const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3000, () => console.log('Server running on port 3000'));
