import { Router } from "express";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { verifyToken } from "../middlewares/VerifyToken";

const carsRoutes = Router();
carsRoutes.use(verifyToken);

const createCarController = new CreateCarController();
carsRoutes.post('/', createCarController.handle);

export { carsRoutes };