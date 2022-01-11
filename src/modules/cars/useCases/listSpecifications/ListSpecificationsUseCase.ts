import { inject, injectable } from "tsyringe";
import { Category } from "../../infra/typeorm/entities/Category";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {

  constructor(@inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository) {}

  async execute(): Promise<Category[]> {
    return await this.specificationsRepository.list();
  }
}

export { ListSpecificationsUseCase }