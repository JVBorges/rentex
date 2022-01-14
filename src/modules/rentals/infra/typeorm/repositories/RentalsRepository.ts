import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental)
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return await this.repository.findOne({ carId });
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return await this.repository.findOne({ userId });
  }
}

export { RentalsRepository }