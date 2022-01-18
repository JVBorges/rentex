import dayjs from "dayjs";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../../cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "../../../cars/useCases/createCar/CreateCarUseCase";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRental: CreateRentalUseCase;
let createCar: CreateCarUseCase;
let dayjsProvider: DayjsDateProvider;

let car: Car;

describe('Create rental', () => {
  const datePlus24Hours = dayjs().add(1, "day").toDate();
  beforeEach(async () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    createRental = new CreateRentalUseCase(rentalsRepositoryInMemory, carsRepositoryInMemory, dayjsProvider);
    createCar = new CreateCarUseCase(carsRepositoryInMemory);

    car = await createCar.execute({
      name: 'Name car',
      description: 'Description car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: 'category'
    });
  });

  it('Should be able to create a new rental', async () => {
    const rental = await createRental.execute({ userId: '1234', carId: car.id, deadlineDate: datePlus24Hours });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  it('Should not be able to create a rental if user already have one open', () => {
    expect(async () => {
      const firstRental = await createRental.execute({ userId: '1234', carId: car.id, deadlineDate: datePlus24Hours });
      const secondRental = await createRental.execute({ userId: '1234', carId: '654321', deadlineDate: datePlus24Hours });
    }).rejects.toBeInstanceOf(AppError)
  });

  it('Should not be able to create a rental if the chosen car is not available', () => {
    expect(async () => {
      const firstRental = await createRental.execute({ userId: '54312', carId: car.id, deadlineDate: datePlus24Hours });
      const secondRental = await createRental.execute({ userId: '1234', carId: car.id, deadlineDate: datePlus24Hours });
    }).rejects.toBeInstanceOf(AppError)
  });

  it('Should not be able to create a rental if the deadline is lesser then 24 hours from the starting date', () => {
    expect(async () => {
      const rental = await createRental.execute({ userId: '54312', carId: car.id, deadlineDate: dayjs().toDate() });
    }).rejects.toBeInstanceOf(AppError)
  });
})