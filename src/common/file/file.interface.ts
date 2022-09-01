export type IFile = Express.Multer.File;

export interface ISingleFileUploadOptions {
  readonly fieldName: string;
  readonly allowedMimeTypes: string[],
}