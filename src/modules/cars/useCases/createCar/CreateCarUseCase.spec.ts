import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCar: CreateCarUseCase;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCar = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a new car', async () => {
    const createdCar = await createCar.execute({
      name: 'Name car',
      description: 'Description car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: 'category'
    });

    expect(createdCar).toHaveProperty('id');
  });

  it('Should not able to create a new car with duplicate license plate', () => {
    expect(async () => {
      const car = {
        name: 'Car 1',
        description: 'Description car',
        dailyRate: 100,
        licensePlate: 'ABC-1234',
        fineAmount: 60,
        brand: 'Brand',
        categoryId: 'category'
      };
  
      const car_1 = await createCar.execute(car);
      const car_2 = await createCar.execute({ ...car, name: 'Car 2' });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to created a car with disponibility by default', async () => {
    const createdCar = await createCar.execute({
      name: 'Available car',
      description: 'Description car',
      dailyRate: 100,
      licensePlate: 'ABC-9876',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: 'category'
    });

    expect(createdCar.available).toBe(true);
  });
})