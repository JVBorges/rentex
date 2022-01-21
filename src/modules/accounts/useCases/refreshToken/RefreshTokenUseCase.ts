import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {

  constructor(
    @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsProvider') private dayjsProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const { sub: userId, email } = verify(token, process.env.JWT_REFRESH_SECRET) as IPayload;

    const userToken = await this.usersTokensRepository.findByIdAndRefreshToken(userId, token);

    if (!userToken) 
      throw new AppError("Refresh Token does not exists!", 404);

    await this.usersTokensRepository.deleteById(userToken.id);

    const expiresDate = this.dayjsProvider.addDays(30);

    const refreshToken = sign({ email }, process.env.JWT_REFRESH_SECRET, {
      subject: userId,
      expiresIn: "30d"
    });

    await this.usersTokensRepository.create({
      userId,
      refreshToken,
      expiresDate
    });

    return refreshToken;
  }
}