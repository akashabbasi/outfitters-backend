import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { IResponseOptions } from '../response.interface';
import { ResponseDefaultInterceptor } from '../interceptors/response.default.interceptor';
import { RESPONSE_SERIALIZATION_META_KEY } from '../constants/response.constant';

export function Response(options?: IResponseOptions): any {
  return applyDecorators(
    UseInterceptors(ResponseDefaultInterceptor),
    SetMetadata(
      RESPONSE_SERIALIZATION_META_KEY,
      options ? options.classSerialization : undefined
    ),
  );
}
