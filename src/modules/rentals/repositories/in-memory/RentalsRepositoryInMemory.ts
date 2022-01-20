import { ICreateRentalDTO } from "../../dtos/ICreateRentalDTO";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      ...data,
      ...{
        startDate: new Date()
      }
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.rentals.find(rental => rental.carId === carId && !rental.endDate);
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.rentals.find(rental => rental.userId === userId && !rental.endDate);
  }
  
  async findById(id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.id === id);
  }

  async findByUser(userId: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.userId === userId);
  }
}

export { RentalsRepositoryInMemory }