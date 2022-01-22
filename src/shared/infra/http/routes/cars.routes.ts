import { Router } from "express";
import multer from "multer";

import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadImage/UploadCarImageController";

import uploadConfig from "../../../../config/upload";
import { verifyAdmin } from "../middlewares/VerifyAdmin";
import { verifyToken } from "../middlewares/VerifyToken";

const uploadCarImages = multer(uploadConfig);

const carsRoutes = Router();

const createCarController = new CreateCarController();
carsRoutes.post('/', verifyToken, verifyAdmin, createCarController.handle);

const listAvailableCarsController = new ListAvailableCarsController();
carsRoutes.get('/available', listAvailableCarsController.handle);

const createCarSpecificationController = new CreateCarSpecificationController();
carsRoutes.post('/specifications/:carId', verifyToken, verifyAdmin, createCarSpecificationController.handle);

const uploadCarImageController = new UploadCarImageController();
carsRoutes.post('/images/:carId', verifyToken, verifyAdmin, uploadCarImages.array('images'), uploadCarImageController.handle);

export { carsRoutes };