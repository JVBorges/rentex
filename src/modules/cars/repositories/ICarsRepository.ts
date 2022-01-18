import { ICreateCarDTO } from "../dtos/ICreateCarsDTO";
import { IFilterOptsDTO } from "../../../shared/dtos/IFilterOptsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  listAvailable(filterOpts?: IFilterOptsDTO): Promise<Car[]>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository, ICreateCarDTO }