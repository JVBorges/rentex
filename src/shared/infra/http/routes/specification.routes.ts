import { Router } from 'express';
import { verifyToken } from '../middlewares/VerifyToken';
import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '../../../../modules/cars/useCases/listSpecifications/ListSpecificationsController';

const specificationsRoutes = Router();

specificationsRoutes.use(verifyToken);

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.post('/', createSpecificationController.handle);

const listSpecificationsController = new ListSpecificationsController();
specificationsRoutes.get('/', listSpecificationsController.handle);


export { specificationsRoutes }