import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { IErrorHttpFilterMetadata } from 'src/common/error/error.interface';
import { IRequestApp } from 'src/common/request/request.interface';
import {
  RESPONSE_SERIALIZATION_META_KEY,
  RESPONSE_SERIALIZATION_OPTIONS_META_KEY,
} from '../constants/response.constant';
import { ResponseDefaultDto } from '../dtos/response.default.dto';
import { IResponse } from '../response.interface';

@Injectable()
export class ResponseDefaultInterceptor
  implements NestInterceptor<Promise<any>>
{
  constructor(private readonly reflector: Reflector) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Promise<ResponseDefaultDto>>> {
    if (context.getType() === 'http') {
      return next.handle().pipe(
        map(async (responseData: Promise<Record<string, any>>) => {
          const ctx: HttpArgumentsHost = context.switchToHttp();
          const responseExpress: Response = ctx.getResponse<Response>();
          const requestExpress: IRequestApp = ctx.getRequest<IRequestApp>();

          const classSerialization: ClassConstructor<any> = this.reflector.get<
            ClassConstructor<any>
          >(RESPONSE_SERIALIZATION_META_KEY, context.getHandler());

          const classSerializationOptions: ClassTransformOptions =
            this.reflector.get<ClassTransformOptions>(
              RESPONSE_SERIALIZATION_OPTIONS_META_KEY,
              context.getHandler(),
            );

          let statusCode: number = responseExpress.statusCode;

          const __path = requestExpress.path;
          const __requestId = requestExpress.id;
          const __version = requestExpress.version;
          const __repoVersion = requestExpress.repoVersion;

          const resMetadata: IErrorHttpFilterMetadata = {
            path: __path,
            requestId: __requestId,
            version: __version,
            repoVersion: __repoVersion,
          };

          const response = (await responseData) as IResponse;
          if (response) {
            const { metadata, ...data } = response;
            let serialization = data;

            if (classSerialization) {
              serialization = plainToInstance(
                classSerialization,
                data,
                classSerializationOptions,
              );
            }

            if (metadata) {
              statusCode = metadata.statusCode || statusCode;

              delete metadata.statusCode;
              delete metadata.message;
              delete metadata.properties;
            }

            serialization =
              serialization && Object.keys(serialization).length > 0
                ? serialization
                : undefined;

            return {
              statusCode,
              metadata: { ...resMetadata, ...metadata },
              data: serialization,
            };
          }

          return {
            statusCode,
            metadata: resMetadata,
          };
        }),
      );
    }

    return next.handle();
  }
}
