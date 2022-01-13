import { Router } from "express";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { verifyAdmin } from "../middlewares/VerifyAdmin";
import { verifyToken } from "../middlewares/VerifyToken";

const carsRoutes = Router();

const createCarController = new CreateCarController();
carsRoutes.post('/', verifyToken, verifyAdmin, createCarController.handle);

const listAvailableCarsController = new ListAvailableCarsController();
carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };