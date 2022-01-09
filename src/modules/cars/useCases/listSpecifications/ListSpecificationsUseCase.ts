import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {

  constructor(@inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository) {}

  async execute(): Promise<Category[]> {
    return await this.specificationsRepository.list();
  }
}

export { ListSpecificationsUseCase }