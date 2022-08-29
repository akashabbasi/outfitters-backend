import { ClassConstructor } from 'class-transformer';

export interface IResponseMetadata {
  statusCode?: number;
  message?: string;
  [key: string]: any;
}

export interface IResponseOptions {
  classSerialization: ClassConstructor<any>;
}

export interface IResponse {
  metadata?: IResponseMetadata;
  [key: string]: any;
}