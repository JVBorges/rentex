import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { SESMailProvider } from "./MailProvider/implementations/SESMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>("DayjsProvider", DayjsDateProvider);

container.registerSingleton<IStorageProvider>("StorageProvider", process.env.NODE_ENV === 'PRD' ? S3StorageProvider : LocalStorageProvider);

if (process.env.NODE_ENV !== 'test') {
  container.registerInstance<IMailProvider>("MailProvider", process.env.NODE_ENV === 'PRD' ? new SESMailProvider() : new EtherealMailProvider());
}