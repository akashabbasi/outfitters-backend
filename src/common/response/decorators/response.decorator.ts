import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { IResponseOptions } from '../response.interface';
import { ResponseDefaultInterceptor } from '../interceptors/response.default.interceptor';
import {
  RESPONSE_PAGING_TYPE_META_KEY,
  RESPONSE_SERIALIZATION_META_KEY,
} from '../constants/response.constant';
import { ENUM_PAGINATION_TYPE } from '../../pagination/constants/pagination.enum.constant';
import {
  RESPONSE_CUSTOM_TIMEOUT_META_KEY,
  RESPONSE_CUSTOM_TIMEOUT_VALUE_META_KEY,
} from '../constants/response.constant';
import { ResponsePagingInterceptor } from '../interceptors/response.paging.interceptor';

export function Response(options?: IResponseOptions): any {
  return applyDecorators(
    UseInterceptors(ResponseDefaultInterceptor),
    SetMetadata(
      RESPONSE_SERIALIZATION_META_KEY,
      options ? options.classSerialization : undefined,
    ),
  );
}

export function ResponsePagingType(type: ENUM_PAGINATION_TYPE): any {
  return applyDecorators(SetMetadata(RESPONSE_PAGING_TYPE_META_KEY, type));
}

export function ResponsePaging(options?: IResponseOptions): any {
  return applyDecorators(
    UseInterceptors(ResponsePagingInterceptor),
    SetMetadata(
      RESPONSE_SERIALIZATION_META_KEY,
      options ? options.classSerialization : undefined,
    ),
  );
}

export function ResponseTimeout(seconds: string): any {
  return applyDecorators(
    SetMetadata(RESPONSE_CUSTOM_TIMEOUT_META_KEY, true),
    SetMetadata(RESPONSE_CUSTOM_TIMEOUT_VALUE_META_KEY, seconds),
  );
}
