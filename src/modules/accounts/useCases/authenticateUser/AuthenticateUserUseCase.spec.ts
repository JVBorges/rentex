import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUser: AuthenticateUserUseCase;
let createUser: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUser = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUser = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driverLicense: '123456',
      email: 'user@test.com',
      password: '12345',
      name: 'User test'
    };
    await createUser.execute(user);
    
    const result = await authenticateUser.execute({ 
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate an user with a incorrent password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driverLicense: '123456',
        email: 'user@test.com',
        password: '12345',
        name: 'User test'
      };
      await createUser.execute(user);
      
      const result = await authenticateUser.execute({ 
        email: user.email,
        password: '1234'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate an non existent user', () => {
    expect(async () => 
      await authenticateUser.execute({ email: 'fake@email.com', password: '12345' })
    ).rejects.toBeInstanceOf(AppError);
  });
});