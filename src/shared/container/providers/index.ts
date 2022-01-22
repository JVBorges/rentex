import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>("DayjsProvider", DayjsDateProvider);

if (process.env.NODE_ENV !== 'test') {
  container.registerInstance<IMailProvider>("EtherealProvider", new EtherealMailProvider());
}