import { Router } from "express";
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { verifyAdmin } from "../middlewares/VerifyAdmin";
import { verifyToken } from "../middlewares/VerifyToken";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
rentalsRoutes.post('/', verifyToken, verifyAdmin, createRentalController.handle);

export { rentalsRoutes }