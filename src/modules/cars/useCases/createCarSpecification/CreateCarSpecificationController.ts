import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params;
    const { specificationsId } = req.body;

    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);
    const car = await createCarSpecificationUseCase.execute({ carId, specificationsId });

    return res.status(201).json(car);
  }
}

export { CreateCarSpecificationController }