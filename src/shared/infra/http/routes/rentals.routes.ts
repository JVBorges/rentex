import { Router } from "express";
import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/rentals/useCases/DevolutionRental/DevolutionRentalController";
import { verifyToken } from "../middlewares/VerifyToken";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
rentalsRoutes.post('/', verifyToken, createRentalController.handle);

const devolutionRentalController = new DevolutionRentalController();
rentalsRoutes.post('/devolution/:id', verifyToken, devolutionRentalController.handle);


export { rentalsRoutes }