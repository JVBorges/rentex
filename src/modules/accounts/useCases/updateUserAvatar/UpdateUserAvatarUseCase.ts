import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  userId: string;
  avatarFile: string
}

@injectable()
class UpdateUserAvatarUseCase {

  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (user.avatar) 
      await this.storageProvider.delete(user.avatar, "avatar");

    await this.storageProvider.save(avatarFile, "avatar");
    
    await this.usersRepository.create({ 
      ...user,
      ...{ 
        avatar: avatarFile
      } 
    });
  }
}

export { UpdateUserAvatarUseCase }