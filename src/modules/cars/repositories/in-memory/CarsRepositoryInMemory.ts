import { IFilterOptsDTO } from "../../../../shared/dtos/IFilterOptsDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO,  } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, data);

    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find(car => car.licensePlate === licensePlate);
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);    
  }

  async listAvailable(filterOpts: IFilterOptsDTO): Promise<Car[]> {
    return this.cars.filter(car => !filterOpts ? car.available : car[filterOpts.field] === filterOpts.value);
  }
}

export { CarsRepositoryInMemory }