import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImageController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params;
    const images = req.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const imagesName = images.map(image => image.filename);

    const result = await uploadCarImageUseCase.execute({ carId, imagesName });

    return res.status(201).json(result);
  }
}

export { UploadCarImageController }