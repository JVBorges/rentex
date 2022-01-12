import { getRepository, Repository } from "typeorm";
import { ICarsRepository, ICreateCarDTO } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }
  
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return await this.repository.findOne({ licensePlate });
  }
}

export { CarsRepository }