import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserTokens>;
  findByIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserTokens>;
  deleteById(userTokensId: string): Promise<void>;
  findByRefreshToken(refreshToken: string): Promise<UserTokens>;
}