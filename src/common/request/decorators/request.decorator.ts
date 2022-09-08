import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { IResult } from 'ua-parser-js';
import { REQUEST_PARAM_CLASS_DTOS_META_KEY } from '../constants/request.constant';
import { IRequestApp } from '../request.interface';

export const RequestUserAgent = createParamDecorator(
  (data: string, ctx: ExecutionContext): IResult => {
    const { userAgent } = ctx.switchToHttp().getRequest() as IRequestApp;
    return userAgent;
  },
);

export const RequestId = createParamDecorator(
  (data: string, ctx: ExecutionContext): string => {
    const { id } = ctx.switchToHttp().getRequest() as IRequestApp;
    return id;
  },
);

export function RequestParamGuard(
  ...classValidation: ClassConstructor<any>[]
): any {
  return applyDecorators(
    UseGuards(RequestParamGuard),
    SetMetadata(REQUEST_PARAM_CLASS_DTOS_META_KEY, classValidation)
  );

}
