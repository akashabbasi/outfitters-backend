export type IFile = Express.Multer.File;

export interface ISingleFileUploadOptions {
  readonly fieldName: string;
  readonly allowedMimeTypes: string[],
}

export interface IFileUploadDetails {
  readonly content: Buffer;
  readonly filename: string;
  readonly mimeType: string;
}
