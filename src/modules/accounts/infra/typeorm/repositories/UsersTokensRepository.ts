import { getRepository, Repository } from "typeorm";
import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";

export class UsersTokensRepository implements IUsersTokensRepository {
  private repo: Repository<UserTokens>

  constructor() {
    this.repo = getRepository(UserTokens);
  }
  
  async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repo.create(data);

    await this.repo.save(userToken);

    return userToken;
  }

  async findByIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserTokens> {
    return await this.repo.findOne({ userId, refreshToken });
  }

  async deleteById(userTokensId: string): Promise<void> {
    await this.repo.delete(userTokensId);
  }
}