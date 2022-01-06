import { Category } from "../model/Category";

interface ICreateCatergoryDTO {
  name: string,
  description: string
}

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCatergoryDTO): void
}

export { ICategoriesRepository, ICreateCatergoryDTO }