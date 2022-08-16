import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Injectable()
export class ResponseCustomHeadersInterceptor
  implements NestInterceptor<Promise<any>> {
  async intercept(
    context: ExecutionContext, 
    next: CallHandler
  ): Promise<Observable<Promise<any> | string>> {
    if (context.getType() === 'http') {
      return next.handle().pipe(
        map(async (response: Promise<Response>) => {
          const ctx: HttpArgumentsHost = context.switchToHttp();
          const responseExpress: Response = ctx.getResponse();
          const request: IRequestApp = ctx.getRequest();

          responseExpress.setHeader('x-custom-lang', request.customLang);
          responseExpress.setHeader('x-timestamp', request.timestamp);
          responseExpress.setHeader('x-timezone', request.timezone);
          responseExpress.setHeader('x-request-id', request.id);
          responseExpress.setHeader('x-version', request.version);
          responseExpress.setHeader('x-repo-version', request.repoVersion);

          return response;
        })
      );
    }

    return next.handle();
  }
}