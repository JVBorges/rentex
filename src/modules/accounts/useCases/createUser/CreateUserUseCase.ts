import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const foundedUser = await this.usersRepository.findByEmail(data.email);

    if (foundedUser)
      throw new AppError('User already exists!', 400);

    const passwordHash = await hash(data.password, 8);
    await this.usersRepository.create({ ...data, password: passwordHash });
  }
}

export { CreateUserUseCase }