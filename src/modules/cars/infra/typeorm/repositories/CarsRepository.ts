import { getRepository, Repository } from "typeorm";
import { IFilterOptsDTO } from "../../../../../shared/dtos/IFilterOptsDTO";
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

  async findById(id: string): Promise<Car> {
    return await this.repository.findOne({ id });
  }

  async listAvailable(filterOpts?: IFilterOptsDTO): Promise<Car[]> {
    const carsQuery = this.repository.createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (filterOpts) {
      let { field, value } = filterOpts;
      const alias = {
        categoryId: 'category_id'
      };
      field = alias[field] ?? field;
      const whereFilter = {};
      whereFilter[field] = value;
      carsQuery.andWhere(`${field} = :${field}`, whereFilter);
    }

    return await carsQuery.getMany();
  }
}

export { CarsRepository }