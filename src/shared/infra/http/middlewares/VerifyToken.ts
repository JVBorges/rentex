import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) 
    throw new AppError('Token missing', 401);

  const [, token ] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, process.env.JWT_SECRET) as IPayload;
    
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if (!user) 
      throw new AppError('User does not exists!', 401)
    
    req.user = { id: userId };

    next();
  } catch (err) { throw new AppError('Invalid token!', 401) }
}