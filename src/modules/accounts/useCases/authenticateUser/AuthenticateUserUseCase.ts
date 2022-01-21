import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string,
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository') private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsProvider') private dayjsProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    
    if (!user)
      throw new AppError('Email or password incorrect!', 400);

    const isValid = await compare(password, user.password);
    
    if (!isValid)
      throw new AppError('Email or password incorrect!', 400);

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "15m"
    });

    const expiresDate = this.dayjsProvider.addDays(30);

    const refreshToken = sign({ email }, process.env.JWT_REFRESH_SECRET, {
      subject: user.id,
      expiresIn: "30d"
    });

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate
    });

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refreshToken
    }
  }
}

export { AuthenticateUserUseCase }