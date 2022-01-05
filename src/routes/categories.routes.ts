import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
	const { name, description } = req.body;

	try {
		const createCategoryService = new CreateCategoryService(categoriesRepository);
		createCategoryService.execute({ name, description });

		return res.status(201).send();
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
});

categoriesRoutes.get('/', (req, res) => {
	const all = categoriesRepository.list();

	return res.status(200).json({ all });
})

export { categoriesRoutes }