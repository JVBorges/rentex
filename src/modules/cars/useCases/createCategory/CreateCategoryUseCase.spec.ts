import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('Should be able to create a new category', async () => {
    const category = {
      name: "Category test",
      description: "Description test"
    }

    await createCategory.execute(category);

    const createdCategory = await categoriesRepositoryInMemory.findByName(category.name);

    expect(createdCategory).toHaveProperty('id');
  });

  it('Should not be able to create a category with the same name', () => {
    expect(async () => {
      const category = {
        name: "Category test",
        description: "Description test"
      }
  
      await createCategory.execute(category);
      await createCategory.execute(category);
      
      const createdCategory = await categoriesRepositoryInMemory.findByName(category.name);
  
      expect(createdCategory).toHaveProperty('id');
    }).rejects.toBeInstanceOf(AppError);
  });
})