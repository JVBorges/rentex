import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../infra/typeorm/entities/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPassword: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory; 
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

let user: User;

describe('Send forgot mail', () => {

  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPassword = new SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);

    user = await usersRepositoryInMemory.create({
      name: 'Test',
      email: 'test@mail.com',
      password: '1234',
      driverLicense: '123545'
    });
  });

  it('Should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await sendForgotPassword.execute('test@mail.com');
    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to send an email if user does not exists', () => {
    expect(async () => {
      await sendForgotPassword.execute('asdj@mail.com')
    }).rejects.toBeInstanceOf(AppError);
  });
})