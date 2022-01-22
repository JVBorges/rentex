import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { verifyToken } from '../middlewares/VerifyToken';
import { verifyAdmin } from '../middlewares/VerifyAdmin';

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();
categoriesRoutes.use(verifyToken);

const uploadCategory = multer(uploadConfig);

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post('/', verifyAdmin, createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get('/', listCategoriesController.handle);

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post('/upload', verifyAdmin, uploadCategory.single('file'), importCategoryController.handle);

export { categoriesRoutes }