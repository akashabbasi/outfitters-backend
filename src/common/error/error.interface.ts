import { ValidationError } from 'class-validator';

export interface IErrors {
  readonly message: string;
  readonly property: string;
}

export interface IErrorHttpFilterMetadata {
  requestId: string;
  path: string;
  [key: string]: any;
}

export interface IErrorException {
  statusCode: number;
  message: string;
  error?: string;
  errors?: ValidationError[];
  metadata?: Record<string, any>;
  data?: Record<string, any>;
}

export interface IErrorHttpFilter {
  statusCode: number;
  message: string;
  error?: string;
  errors?: IErrors[];
  metadata: IErrorHttpFilterMetadata;
  data?: Record<string, any>;
}
