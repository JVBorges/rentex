import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string,
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  constructor(@inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const Specification = await this.specificationsRepository.findByName(name);

    if (Specification)
      throw new Error('Specification already exists!');

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase }