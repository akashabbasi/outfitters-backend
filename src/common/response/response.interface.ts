import { ClassConstructor } from 'class-transformer';

export interface IResponseOptions {
  classSerialization: ClassConstructor<any>;
}
