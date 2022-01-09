import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
      const { user, token } = await authenticateUserUseCase.execute({ email, password });
      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export { AuthenticateUserController }