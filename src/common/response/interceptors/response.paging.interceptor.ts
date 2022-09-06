import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import {
  ResponsePagingDto,
  ResponsePagingMetadataDto,
} from '../dtos/response.paging.dto';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { IRequestApp } from 'src/common/request/request.interface';
import { ENUM_PAGINATION_TYPE } from '../../pagination/constants/pagination.enum.constant';
import {
  RESPONSE_PAGING_TYPE_META_KEY,
  RESPONSE_SERIALIZATION_META_KEY,
  RESPONSE_SERIALIZATION_OPTIONS_META_KEY,
} from '../constants/response.constant';
import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import { IErrorHttpFilterMetadata } from 'src/common/error/error.interface';
import { IResponsePaging } from '../response.interface';

@Injectable()
export class ResponsePagingInterceptor
  implements NestInterceptor<Promise<any>>
{
  constructor(private readonly reflector: Reflector) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Promise<ResponsePagingDto>>> {
    if (context.getType() === 'http') {

      return next.handle().pipe(
        map(async (responseData: Promise<ResponsePagingDto>) => {
          const ctx: HttpArgumentsHost = context.switchToHttp();
          const responseExpress: Response = ctx.getResponse();
          const requestExpress: IRequestApp = ctx.getRequest<IRequestApp>();

          const type: ENUM_PAGINATION_TYPE =
            this.reflector.get<ENUM_PAGINATION_TYPE>(
              RESPONSE_PAGING_TYPE_META_KEY,
              context.getHandler(),
            );

          const classSerialization: ClassConstructor<any> = this.reflector.get<
            ClassConstructor<any>
          >(RESPONSE_SERIALIZATION_META_KEY, context.getHandler());

          const classSerializationOptions: ClassTransformOptions =
            this.reflector.get<ClassTransformOptions>(
              RESPONSE_SERIALIZATION_OPTIONS_META_KEY,
              context.getHandler(),
            );

          // response
          const response = (await responseData) as IResponsePaging;

          const {
            metadata,
            totalData,
            currentPage,
            perPage,
            data,
            availableSort,
            availableSearch,
            totalPage,
          } = response;

          let statusCode: number = responseExpress.statusCode;
          let serialization = data;

          if (classSerialization) {
            serialization = plainToInstance(
              classSerialization,
              data,
              classSerializationOptions,
            );
          }

          // get metadata
          const __path = requestExpress.path;
          const __requestId = requestExpress.id;
          const __version = requestExpress.version;
          const __repoVersion = requestExpress.repoVersion;

          let message: string;
          if (metadata) {
            statusCode = metadata.statusCode || statusCode;
            message = metadata.message ? metadata.message : undefined;

            delete metadata.statusCode;
            delete metadata.message;
            delete metadata.properties;
          }

          const path = requestExpress.path;
          const addMetadata: ResponsePagingMetadataDto = {
            nextPage:
              currentPage < totalPage
                ? `${path}?perPage=${perPage}&page=${currentPage + 1}`
                : undefined,
            previousPage:
              currentPage > 1
                ? `${path}?perPage=${perPage}&page=${currentPage - 1}`
                : undefined,
            firstPage:
              totalPage > 1
                ? `${path}?perPage=${perPage}&page=${1}`
                : undefined,
            lastPage:
              totalPage > 1
                ? `${path}?perPage=${perPage}&page=${totalPage}`
                : undefined,
          };

          const resMetadata: IErrorHttpFilterMetadata = {
            requestId: __requestId,
            path: __path,
            version: __version,
            repoVersion: __repoVersion,
          };

          const responseHttp: ResponsePagingDto = {
            statusCode,
            message,
            totalData,
            totalPage,
            currentPage,
            perPage,
            availableSort,
            availableSearch,
            metadata: {
              ...addMetadata,
              ...resMetadata,
              ...metadata,
            },
            data: serialization,
          };
          if (
            type === ENUM_PAGINATION_TYPE.SIMPLE ||
            type === ENUM_PAGINATION_TYPE.MINI
          ) {
            delete responseHttp.totalPage;
            delete responseHttp.currentPage;
            delete responseHttp.perPage;
          }

          if (type === ENUM_PAGINATION_TYPE.MINI) {
            delete responseHttp.availableSort;
            delete responseHttp.availableSearch;
          }

          return responseHttp;
        }),
      );
    }

    return next.handle();
  }
}
