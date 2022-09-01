import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { IRequestApp } from 'src/common/request/request.interface';
import {
  IErrorException,
  IErrorHttpFilter,
  IErrorHttpFilterMetadata,
  IErrors,
} from '../error.interface';

@Catch(HttpException)
export class ErrorHttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const httpStatusCode: number = exception.getStatus();
    const request = ctx.getRequest<IRequestApp>();
    const responseExpress: Response = ctx.getResponse<Response>();
    // get metadata
    const __class = request.__class;
    const __function = request.__function;
    const __path = request.path;
    const __requestId = request.id;
    const __version = request.version;
    const __repoVersion = request.repoVersion;

    const response = exception.getResponse();

    if (!this.isErrorException(response)) {
      responseExpress.status(httpStatusCode).json(response);
      return;
    }

    const responseException = response as IErrorException;
    const { statusCode, message, error, errors, data, metadata } =
      responseException;

    const resMetadata: IErrorHttpFilterMetadata = {
      requestId: __requestId,
      path: __path,
      version: __version,
      repoVersion: __repoVersion,
      ...metadata,
    };

    const finalResponse: IErrorHttpFilter = {
      statusCode: statusCode || httpStatusCode,
      message,
      error: error && Object.keys(error).length > 0 ? error : exception.message,
      errors: errors as IErrors[],
      metadata: resMetadata,
      data,
    };

    responseExpress
      .setHeader('x-request-id', __requestId)
      .setHeader('x-version', __version)
      .setHeader('x-repo-version', __repoVersion)
      .status(httpStatusCode)
      .json(finalResponse);

    return;
  }

  private isErrorException(obj: any): obj is IErrorException {
    return 'statusCode' in obj && 'message' in obj;
  }
}
