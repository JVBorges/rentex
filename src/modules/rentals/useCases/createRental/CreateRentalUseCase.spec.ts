import dayjs from "dayjs";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRental: CreateRentalUseCase;
let dayjsProvider: DayjsDateProvider;

describe('Create rental', () => {
  const datePlus24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsProvider = new DayjsDateProvider();
    createRental = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsProvider);
  });

  it('Should be able to create a new rental', async () => {
    const rental = await createRental.execute({ userId: '1234', carId: '123456', deadlineDate: datePlus24Hours });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  it('Should not be able to create a rental if user already have one open', () => {
    expect(async () => {
      const firstRental = await createRental.execute({ userId: '1234', carId: '123456', deadlineDate: datePlus24Hours });
      const secondRental = await createRental.execute({ userId: '1234', carId: '654321', deadlineDate: datePlus24Hours });
    }).rejects.toBeInstanceOf(AppError)
  });

  it('Should not be able to create a rental if the chosen car is not available', () => {
    expect(async () => {
      const firstRental = await createRental.execute({ userId: '54312', carId: '123456', deadlineDate: datePlus24Hours });
      const secondRental = await createRental.execute({ userId: '1234', carId: '123456', deadlineDate: datePlus24Hours });
    }).rejects.toBeInstanceOf(AppError)
  });

  it('Should not be able to create a rental if the deadline is lesser then 24 hours from the starting date', () => {
    expect(async () => {
      const rental = await createRental.execute({ userId: '54312', carId: '123456', deadlineDate: dayjs().toDate() });
    }).rejects.toBeInstanceOf(AppError)
  });
})