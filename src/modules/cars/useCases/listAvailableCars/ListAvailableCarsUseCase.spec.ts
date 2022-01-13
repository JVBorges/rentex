import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUserCase } from "./ListAvailableCarsUserCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCars: ListAvailableCarsUserCase;

describe('List all cars', () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCars = new ListAvailableCarsUserCase(carsRepositoryInMemory);
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Onix",
      description: "Carro ruim",
      dailyRate: 12.00,
      licensePlate: "HDT-4550",
      fineAmount: 0,
      brand: "Chevrolet",
      categoryId: "c08790f1-599f-40aa-8eba-93bb112bee32"
    });

    const cars = await listCars.execute();
    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by given brand name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fiest",
      description: "Carro brabo",
      dailyRate: 3000.00,
      licensePlate: "YDI91ID2",
      fineAmount: 2000,
      brand: "Ford",
      categoryId: "c08790f1-599f-40aa-8eba-93bb112bee32"
    });

    const cars = await listCars.execute({ field: 'brand', value: 'Ford' });
    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by given category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fusca",
      description: "Joaninha",
      dailyRate: 9999.00,
      licensePlate: "OWS-2314",
      fineAmount: 123523,
      brand: "VW",
      categoryId: "c08790f1-599f-40aa-8eba-93bb112bee32"
    });

    const cars = await listCars.execute({ field: 'categoryId', value: 'c08790f1-599f-40aa-8eba-93bb112bee32' });
    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by given name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Sem criatividade",
      description: "Carro preguiça",
      dailyRate: 11235.23,
      licensePlate: "GSAX123D",
      fineAmount: 0,
      brand: "Uau",
      categoryId: "c08790f1-599f-40aa-8eba-93bb112bee32"
    });

    const cars = await listCars.execute({ field: 'name', value: 'Sem criatividade' });
    expect(cars).toEqual([car]);
  });
});