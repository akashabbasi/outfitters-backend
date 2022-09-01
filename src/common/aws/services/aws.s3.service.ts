import { Injectable } from '@nestjs/common';
import {
  AbortMultipartUploadCommand,
  AbortMultipartUploadCommandInput,
  CompletedPart,
  CompleteMultipartUploadCommand,
  CompleteMultipartUploadCommandInput,
  CreateMultipartUploadCommand,
  CreateMultipartUploadCommandInput,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  GetObjectCommandInput,
  ListObjectsV2Command,
  ObjectIdentifier,
  PutObjectCommand,
  S3Client,
  UploadPartCommand,
  UploadPartCommandInput,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import {
  IAwsS3,
  IAwsS3MultiPart,
  IAwsS3PutItemOptions,
} from '../aws.interface';
import { Readable } from 'stream';

@Injectable()
export class AwsS3Service {
  private readonly s3Client: S3Client;
  private readonly bucket: string;
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: this.configService.get<string>('aws.credential.key'),
        secretAccessKey: this.configService.get<string>(
          'aws.credential.secret',
        ),
      },
      region: this.configService.get<string>('aws.s3.region'),
    });
    this.bucket = this.configService.get<string>('aws.s3.bucket');
    this.baseUrl = this.configService.get<string>('aws.s3.baseUrl');
  }

  async listItemInBucket(prefix?: string): Promise<IAwsS3> {
    const command: ListObjectsV2Command = new ListObjectsV2Command({
      Bucket: this.bucket,
      Prefix: prefix,
    });

    const listItems: Record<string, any> = await this.s3Client.send(command);

    const mapList = listItems.Contents.map((val: Record<string, any>) => {
      const lastIndex: number = val.Key.lastIndexOf('/');
      const path: string = val.Key.substring(0, lastIndex);
      const filename: string = val.Key.substring(lastIndex, val.Key.length);
      const mime: string = filename
        .substring(filename.lastIndexOf('.') + 1, filename.length)
        .toLocaleUpperCase();

      return {
        path,
        pathWithFilename: val.Key,
        filename: filename,
        completedUrl: `${this.baseUrl}/${val.Key}`,
        baseUrl: this.baseUrl,
        mime,
      };
    });

    return mapList;
  }

  async getItemInBucket(
    filename?: string,
    path?: string,
  ): Promise<Record<string, any>> {
    if (path) path = path.startsWith('/') ? path.replace('/', '') : `${path}`;

    const key: string = path ? `${path}/${filename}` : filename;
    const input: GetObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
    };

    const command: GetObjectCommand = new GetObjectCommand(input);
    const item: Record<string, any> = await this.s3Client.send(command);

    return item.Body;
  }

  async putItemInBucket(
    filename: string,
    content: string | Uint8Array | Buffer | Readable | ReadableStream | Blob,
    options?: IAwsS3PutItemOptions,
  ): Promise<IAwsS3> {
    let path: string = options && options.path ? options.path : undefined;
    const acl: string = options && options.acl ? options.acl : 'public-read';

    if (path) path = path.startsWith('/') ? path.replace('/', '') : `${path}`;

    const mime: string = filename
      .substring(filename.lastIndexOf('.') + 1, filename.length)
      .toUpperCase();

    const key: string = path ? `${path}/${filename}` : filename;
    const command: PutObjectCommand = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: content,
      ACL: acl,
    });

    await this.s3Client.send(command);

    return {
      path,
      pathWithFilename: key,
      filename: filename,
      completedUrl: `${this.baseUrl}/${key}`,
      baseUrl: this.baseUrl,
      mime,
    };
  }

  async deleteItemInBucket(filename: string): Promise<void> {
    const command: DeleteObjectCommand = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: filename,
    });
    await this.s3Client.send(command);
  }

  async deleteItemsInBucket(filenames: string[]): Promise<void> {
    const keys: ObjectIdentifier[] = filenames.map((val) => ({ Key: val }));
    const command: DeleteObjectsCommand = new DeleteObjectsCommand({
      Bucket: this.bucket,
      Delete: {
        Objects: keys,
      },
    });
    await this.s3Client.send(command);
  }

  async deleteFolder(dir: string): Promise<void> {
    const commandList: ListObjectsV2Command = new ListObjectsV2Command({
      Bucket: this.bucket,
      Prefix: dir,
    });
    const lists = await this.s3Client.send(commandList);
    const listItems = lists.Contents.map((val) => ({
      Key: val.Key,
    }));
    const commandDeleteItems: DeleteObjectsCommand = new DeleteObjectsCommand({
      Bucket: this.bucket,
      Delete: {
        Objects: listItems,
      },
    });

    await this.s3Client.send(commandDeleteItems);

    const commandDelete: DeleteObjectCommand = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: dir,
    });
    await this.s3Client.send(commandDelete);

    return;
  }

  async createMultiPart(
    filename: string,
    options?: IAwsS3PutItemOptions,
  ): Promise<IAwsS3MultiPart> {
    let path: string = options && options.path ? options.path : undefined;
    const acl: string = options && options.acl ? options.acl : 'public-read';

    if (path) path = path.startsWith('/') ? path.replace('/', '') : `${path}`;

    const mime: string = filename
      .substring(filename.lastIndexOf('.') + 1, filename.length)
      .toUpperCase();
    const key: string = path ? `${path}/${filename}` : filename;

    const multiPartInput: CreateMultipartUploadCommandInput = {
      Bucket: this.bucket,
      Key: key,
      ACL: acl,
    };
    const multiPartCommand: CreateMultipartUploadCommand =
      new CreateMultipartUploadCommand(multiPartInput);
    const response = await this.s3Client.send(multiPartCommand);

    return {
      uploadId: response.UploadId,
      path,
      pathWithFilename: key,
      filename: filename,
      completedUrl: `${this.baseUrl}/${key}`,
      baseUrl: this.baseUrl,
      mime,
    };
  }

  async uploadPart(
    path: string,
    content: Buffer,
    uploadId: string,
    partNumber: number,
  ): Promise<CompletedPart> {
    const uploadPartInput: UploadPartCommandInput = {
      Bucket: this.bucket,
      Key: path,
      Body: content,
      PartNumber: partNumber,
      UploadId: uploadId,
    };
    const uploadPartCommand: UploadPartCommand = new UploadPartCommand(
      uploadPartInput,
    );

    const { ETag } = await this.s3Client.send(uploadPartCommand);

    return {
      ETag,
      PartNumber: partNumber,
    };
  }

  async completeMultipart(
    path: string,
    uploadId: string,
    parts: CompletedPart[],
  ): Promise<void> {
    const completeMultipartInput: CompleteMultipartUploadCommandInput = {
      Bucket: this.bucket,
      Key: path,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts,
      },
    };

    const completeMultipartCommand: CompleteMultipartUploadCommand =
      new CompleteMultipartUploadCommand(completeMultipartInput);

    await this.s3Client.send(completeMultipartCommand);

    return;
  }

  async abortMultipart(path: string, uploadId: string): Promise<void> {
    const abortMultipartInput: AbortMultipartUploadCommandInput = {
      Bucket: this.bucket,
      Key: path,
      UploadId: uploadId,
    };

    const abortMultipartCommand: AbortMultipartUploadCommand =
      new AbortMultipartUploadCommand(abortMultipartInput);

    await this.s3Client.send(abortMultipartCommand);

    return;
  }
}
