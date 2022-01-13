import { inject, injectable } from "tsyringe";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  field: string,
  value: string
}

@injectable()
class ListAvailableCarsUserCase {

  constructor(@inject('CarsRepository') private carsRepository: ICarsRepository) {}
  
  async execute(req?: IRequest): Promise<Car[]> {
    return await this.carsRepository.listAvailable(req);
  }
}

export { ListAvailableCarsUserCase }