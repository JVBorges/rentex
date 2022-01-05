import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
	const { name, description } = req.body;

	const category = categoriesRepository.findByName(name);

	if (!category) {
		categoriesRepository.create({ name, description });
	
		return res.status(201).send();
	} else {
		return res.status(400).json({ error: 'Category already exists!' });
	}
});

categoriesRoutes.get('/', (req, res) => {
	const all = categoriesRepository.list();

	return res.status(200).json({ all });
})

export { categoriesRoutes }