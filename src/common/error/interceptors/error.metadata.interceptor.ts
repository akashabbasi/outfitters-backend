import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {
  ERROR_META_CLASS_KEY,
  ERROR_META_FUNCTION_KEY,
} from 'src/common/error/constants/error.constant';

@Injectable()
export class ErrorMetadataInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const cls = this.reflector.get<string>(
      ERROR_META_CLASS_KEY,
      context.getHandler(),
    );
    const func = this.reflector.get<string>(
      ERROR_META_FUNCTION_KEY,
      context.getHandler(),
    );

    const className = context.getClass().name;
    const methodKey = context.getHandler().name;

    request.__class = cls || className;
    request.__function = func || methodKey;

    return next.handle();
  }
}
