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

export interface IResponsePaging<T = Record<string, any>> {
  totalData: number;
  totalPage?: number;
  currentPage?: number;
  perPage?: number;
  availableSearch?: string[];
  availableSort?: string[];
  metadata?: IResponseMetadata;
  data?: T[];
}
