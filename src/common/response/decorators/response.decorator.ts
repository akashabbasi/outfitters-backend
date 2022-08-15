import { applyDecorators } from '@nestjs/common';
import { IResponseOptions } from '../response.interface';

export function Response(messagePath: string, options?: IResponseOptions): any {
  return applyDecorators(

  );
}