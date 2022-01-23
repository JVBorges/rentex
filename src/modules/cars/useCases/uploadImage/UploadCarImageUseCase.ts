import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";

interface IRequest {
  carId: string;
  imagesName: string[];
}

@injectable()
class UploadCarImageUseCase {

  constructor(
    @inject('CarsImagesRepository') private carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider
  ) {}

  async execute({ carId, imagesName }: IRequest): Promise<void> {
    await Promise.all([
      imagesName.map(imageName => this.carsImagesRepository.create(carId, imageName)),
      imagesName.map(imageName => this.storageProvider.save(imageName, "cars")),
    ]);
  }
}

export { UploadCarImageUseCase }