import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { verifyToken } from "../middlewares/VerifyToken";

import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
usersRoutes.post('/', createUserController.handle);

const updateUserAvatarController = new UpdateUserAvatarController();
usersRoutes.patch('/avatar', verifyToken, uploadAvatar.single('avatar'), updateUserAvatarController.handle)

export { usersRoutes };