import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId, deadlineDate } = req.body;
    const { id: userId } = req.user;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);
    const rental = await createRentalUseCase.execute({ userId, carId, deadlineDate });

    return res.status(201).json(rental);
  }
}

export { CreateRentalController }