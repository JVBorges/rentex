import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post('/', (req, res) => createSpecificationController.handle(req, res));

const listSpecificationsController = new ListSpecificationsController();
specificationsRoutes.get('/', (req, res) => listSpecificationsController.handle(req, res));


export { specificationsRoutes }