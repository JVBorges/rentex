import { inject, injectable } from "tsyringe";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
export class ListRentalsByUserUseCase {

  constructor(@inject('RentalsRepository') private rentalsRepository: IRentalsRepository) {}

  async execute(userId: string): Promise<Rental[]> {
    return await this.rentalsRepository.findByUser(userId);
  }
}