import { Category } from "../../model/Category";
import { ICategoriesRepository, ICreateCatergoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = []; 
  }

  public static getInstance(): CategoriesRepository {
    return CategoriesRepository.INSTANCE = CategoriesRepository.INSTANCE ?? new CategoriesRepository()
  }

  create({ name, description }: ICreateCatergoryDTO): void {
    const category = new Category();

    Object.assign(category, { 
      name,
      description,
      created_at: new Date()
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    return this.categories.find(category => category.name === name);
  }
}

export { CategoriesRepository }