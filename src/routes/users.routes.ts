import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { verifyToken } from "../middlewares/verifyToken";

import { CreateUserController } from "../modules/accounts/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUserController = new CreateUserController();
usersRoutes.post('/', createUserController.handle);

const updateUserAvatarController = new UpdateUserAvatarController();
usersRoutes.patch('/avatar', verifyToken, uploadAvatar.single('avatar'), updateUserAvatarController.handle)

export { usersRoutes };