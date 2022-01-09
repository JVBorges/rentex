import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/createUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
usersRoutes.post('/', (req, res) => createUserController.handle(req, res));

export { usersRoutes };