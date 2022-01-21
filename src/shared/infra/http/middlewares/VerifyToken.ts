import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

interface IPayload {
  sub: string
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) 
    throw new AppError('Token missing', 401);

  const [, token ] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, process.env.JWT_REFRESH_SECRET) as IPayload;
    
    const usersTokensRepository = new UsersTokensRepository();
    const user = await usersTokensRepository.findByIdAndRefreshToken(userId, token);

    if (!user) 
      throw new AppError('User does not exists!', 401)
    
    req.user = { id: userId };

    next();
  } catch (err) { throw new AppError('Invalid token!', 401) }
}