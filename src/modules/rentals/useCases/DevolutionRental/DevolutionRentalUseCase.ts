import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
export class DevolutionRentalUseCase {

  constructor(
    @inject('RentalsRepository') private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository') private carsRepository: ICarsRepository,
    @inject('DayjsProvider') private dateProvider: IDateProvider,
  ) {}

  async execute({ id, userId }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const minimumDaily = 1;

    if (!rental)
      throw new AppError('Could not find any rental with given ID', 404);
    
    const currentDate = this.dateProvider.currentDate();

    let daily = this.dateProvider.compareInDays(rental.startDate, currentDate);
    if (daily <= 0)
      daily = minimumDaily;
    
    const delay = this.dateProvider.compareInDays(currentDate, rental.deadlineDate);

    const car = await this.carsRepository.findById(rental.carId);

    let total = daily * car.dailyRate; 
    if (delay > 0) {
      const fine = delay * car.fineAmount;
      total += fine
    }

    rental.endDate = currentDate;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}