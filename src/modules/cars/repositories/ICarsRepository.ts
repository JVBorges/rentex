import { ICreateCarDTO } from "../dtos/ICreateCarsDTO";
import { IFilterOptsDTO } from "../../../shared/dtos/IFilterOptsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  listAvailable(filterOpts?: IFilterOptsDTO): Promise<Car[]>;
}

export { ICarsRepository, ICreateCarDTO }