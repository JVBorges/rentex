import fs from "fs";
import { resolve } from "path";
import upload from "../../../../../config/upload";
import { IStorageProvider } from "../IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {

  async save(filename: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, filename),
      resolve(`${upload.tmpFolder}/${folder}`, filename)
    );

    return filename;
  }

  async delete(filename: string, folder: string): Promise<string> {
    try {
      const filePath = resolve(`${upload.tmpFolder}/${folder}`, filename);
      await fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);
    } catch (err) {
      return;
    }
  }
}