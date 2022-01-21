import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { resolve } from "path";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
export class SendForgotPasswordMailUseCase {

  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsProvider') private dayjsProvider: IDateProvider,
    @inject('EtherealProvider') private mailProvider: IMailProvider,
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");

    if (!user)
      throw new AppError("User does not exists!", 404);

    const token = uuidV4();
    
    await this.usersTokensRepository.create({
      refreshToken: token,
      userId: user.id,
      expiresDate: this.dayjsProvider.addHours(3)
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.sendMail(email, "Password recovery", variables, templatePath);
  }
}