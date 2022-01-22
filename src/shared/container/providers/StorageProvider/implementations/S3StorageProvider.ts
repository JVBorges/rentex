import { IStorageProvider } from "../IStorageProvider";
import { resolve } from "path";
import fs from "fs";
import { S3 } from "aws-sdk";
import upload from "../../../../../config/upload";
import mime from "mime";

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }
 
  async save(filename: string, folder: string): Promise<string> {
    const filePath = resolve(upload.tmpFolder, filename);

    const file = await fs.promises.readFile(filePath);

    await this.client.putObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: filename,
      ACL: "public-read",
      Body: file,
      ContentType: mime.getType(filePath)
    }).promise();

    await fs.promises.unlink(filePath);

    return filename;
  }

  async delete(filename: string, folder: string): Promise<string> {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: filename
    }).promise();

    return filename;
  }

}