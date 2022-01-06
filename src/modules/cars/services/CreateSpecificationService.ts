import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string,
  description: string
}

class CreateSpecificationService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const category = this.specificationsRepository.findByName(name);

    if (category)
      throw new Error('Specification already exists!');

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationService }