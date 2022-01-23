import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

export class UserMap {
  static toDTO(data: User): IUserResponseDTO {
    const user = instanceToInstance({
      email: data.email,
      name: data.name,
      id: data.id,
      avatar: data.avatar,
      driverLicense: data.driverLicense,
      avatarUrl: data.getAvatarUrl
    });

    return user;
  }
}