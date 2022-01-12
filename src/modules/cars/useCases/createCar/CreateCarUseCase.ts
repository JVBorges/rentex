import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string
}

@injectable()
class CreateCarUseCase {
  
  constructor(@inject('CarsRepository') private carsRepository: ICarsRepository) {}

  async execute({ name, description, dailyRate, licensePlate, fineAmount, brand, categoryId }: IRequest): Promise<Car> {
    const foundedCar = await this.carsRepository.findByLicensePlate(licensePlate);

    if (foundedCar)
      throw new AppError('Car already exists', 400);
    
    const newCar = await this.carsRepository.create({ name, description, dailyRate, licensePlate, fineAmount, brand, categoryId });
    return newCar;
  }
}

export { CreateCarUseCase }