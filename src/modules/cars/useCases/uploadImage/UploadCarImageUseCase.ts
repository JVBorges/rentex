import { inject, injectable } from "tsyringe";
import { CarImage } from "../../infra/typeorm/entities/CarImage";
import { ICarsImagesRepository } from "../../repositories/ICarsImagesRepository";

interface IRequest {
  carId: string;
  imagesName: string[];
}

@injectable()
class UploadCarImageUseCase {

  constructor(@inject('CarsImagesRepository') private carsImagesRepository: ICarsImagesRepository) {}

  async execute({ carId, imagesName }: IRequest): Promise<CarImage[]> {
    return await Promise.all(
      imagesName.map(imageName => this.carsImagesRepository.create(carId, imageName))
    );
  }
}

export { UploadCarImageUseCase }