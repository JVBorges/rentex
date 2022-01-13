import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  carId: string,
  specificationsId: string[]
}

@injectable()
class CreateCarSpecificationUseCase {

  constructor(
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository') private specificationsRepository: ISpecificationsRepository,
  ) {}
  
  async execute({ carId, specificationsId }: IRequest): Promise<Car> {
    const foundedCar = await this.carsRepository.findById(carId);

    if (!foundedCar)
      throw new AppError('Car does not exists!', 404);
    
    const specifications = await this.specificationsRepository.findByIds(specificationsId);
    foundedCar.specifications = specifications;
    
    await this.carsRepository.create(foundedCar);

    return foundedCar;
  }
}

export { CreateCarSpecificationUseCase }