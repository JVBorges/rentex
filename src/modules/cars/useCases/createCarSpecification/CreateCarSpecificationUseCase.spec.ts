import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory
let createCarSpecification: CreateCarSpecificationUseCase;

describe('Create car specification', () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecification = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });

  it('Should be able to add a new specification to a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'Description car',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'Brand',
      categoryId: 'category'
    });

    const specification = await specificationsRepositoryInMemory.create({ description: 'Test', name: 'Test' });
    const specificationsId = [specification.id];

    const specificationsCar = await createCarSpecification.execute({ carId: car.id, specificationsId });
    
    expect(specificationsCar).toHaveProperty('specifications');
    expect(specificationsCar.specifications.length).toBeGreaterThan(0);
  });

  it('Should be able to add a new specification to a non existent car', () => {
    expect(async () => {
      const carId = '1234';
      const specificationsId = ['54321'];
  
      await createCarSpecification.execute({ carId, specificationsId });
    }).rejects.toBeInstanceOf(AppError);
  });
})