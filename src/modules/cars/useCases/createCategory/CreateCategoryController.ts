import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    try {
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
      await createCategoryUseCase.execute({ name, description });
      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { CreateCategoryController }