import { IPaginationOptions } from '../pagination/pagination.interface';

export interface IDatbaseFindOneOptions {
  populate?: Record<string, boolean>;
}

export interface IDatabaseFindAllOptions
  extends IPaginationOptions,
    IDatbaseFindOneOptions {}
