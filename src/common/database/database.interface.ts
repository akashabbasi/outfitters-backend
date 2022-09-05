import { ClientSession } from 'mongoose';
import { IPaginationOptions } from 'src/common/pagination/pagination.interface';

export interface IDatabaseFindOneOptions {
  populate?: Record<string, boolean>;
  session?: ClientSession;
}

export interface IDatabaseFindAllOptions
  extends IPaginationOptions,
    IDatabaseFindOneOptions {}

export type IDatbaseOptions = Pick<IDatabaseFindOneOptions, 'session'>;
