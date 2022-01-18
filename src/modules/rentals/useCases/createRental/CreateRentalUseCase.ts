import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
  userId: string;
  carId: string;
  deadlineDate: Date;
}

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('DayjsProvider') private dayjsProvider: IDateProvider,
  ) {}

  async execute({ userId, carId, deadlineDate }: IRequest): Promise<Rental> {
    const minimumHourRange = 24;

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(carId);

    if (carUnavailable) 
      throw new AppError('Car is unavailable', 400)
    
    const rentalOpenedToUser = await this.rentalsRepository.findOpenRentalByUser(userId);

    if (rentalOpenedToUser)
      throw new AppError('The currently user already has a rental in progress', 400)

    const currentDate = this.dayjsProvider.currentDate();
    const dateDifference = this.dayjsProvider.compareInHours(currentDate, deadlineDate);
    
    if (dateDifference < minimumHourRange)
      throw new AppError('Rentals must have at least 24 hours difference', 400);
    
    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      deadlineDate
    });

    await this.carsRepository.updateAvailable(carId, false);
    
    return rental;
  }

}

export { CreateRentalUseCase }