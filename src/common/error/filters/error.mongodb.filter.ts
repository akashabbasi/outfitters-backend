import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ConflictException,
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { ENUM_DATABASE_ERROR_CODES } from 'src/common/database/constants/database.error-code.constant';

@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly statusCode: number,
    private readonly message: string,
  ) {}
  catch(exception: MongoServerError, host: ArgumentsHost) {
    switch (exception.code) {
      case ENUM_DATABASE_ERROR_CODES.UNIQUE_VIOLATION:
        const key = Object.keys(exception.keyValue)[0];
        throw new ConflictException({
          statusCode: this.statusCode,
          message: this.message,
          error: `${key} '${exception.keyValue[key]}' already exist`,
        });
      default:
        throw exception;
    }
  }
}
