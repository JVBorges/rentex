import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
  token: string;
  password: string
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsProvider') private dateProvider: IDateProvider,
  ){}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken)
      throw new AppError("Invalid token!", 400);
    
    const isExpired = this.dateProvider.compareIfBefore(userToken.expiresDate, this.dateProvider.currentDate());

    if (isExpired)
      throw new AppError("Expired token!", 400);

    const user = await this.usersRepository.findById(userToken.userId);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}