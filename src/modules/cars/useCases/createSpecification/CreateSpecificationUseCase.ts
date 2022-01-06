import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string,
  description: string
}

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const Specification = this.specificationsRepository.findByName(name);

    if (Specification)
      throw new Error('Specification already exists!');

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase }