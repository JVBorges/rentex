import { Request, Response } from "express";
import { container } from "tsyringe";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    try {
      const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase); 
      await createSpecificationUseCase.execute({ name, description });
      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { CreateSpecificationController }