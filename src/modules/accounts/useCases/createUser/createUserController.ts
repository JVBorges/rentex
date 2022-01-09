import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./createUserUseCase";

class CreateUserController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, username, email, password, driverLicense } = req.body;
    try {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      await createUserUseCase.execute({ name, username, email, password, driverLicense });
      return res.status(201).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export { CreateUserController }