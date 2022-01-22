import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../../infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, data);

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserTokens> {
    return this.usersTokens.find(userToken => userToken.refreshToken === refreshToken && userToken.userId === userId);
  }

  async deleteById(userTokensId: string): Promise<void> {
    const userToken = this.usersTokens.find(userToken => userToken.id === userTokensId);
    const index = this.usersTokens.indexOf(userToken);
    this.usersTokens.splice(index);
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens> {
    return this.usersTokens.find(userToken => userToken.refreshToken === refreshToken);
  }
}