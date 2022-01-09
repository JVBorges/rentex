import { Category } from "../entities/Category";

interface ICreateCatergoryDTO {
  name: string,
  description: string
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCatergoryDTO): Promise<void>
}

export { ICategoriesRepository, ICreateCatergoryDTO }