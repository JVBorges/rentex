import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController';

const categoriesRoutes = Router();

const upload = multer({ dest: './temp' });

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post('/', (req, res) => createCategoryController.handle(req, res));

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get('/', (req, res) => listCategoriesController.handle(req, res));

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post('/upload', upload.single('file'), (req, res) => importCategoryController.handle(req, res));

export { categoriesRoutes }