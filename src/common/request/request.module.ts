import {
  BadRequestException,
  HttpStatus,
  Module,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from './constants/request.status-code.constant';
import { MinGreaterThanConstraint } from './validations/request.min-greater-than.validation';
import { SkipConstraint } from './validations/request.skip.validation';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          skipNullProperties: false,
          skipUndefinedProperties: false,
          skipMissingProperties: false,
          whitelist: true,
          errorHttpStatusCode: HttpStatus.BAD_REQUEST,
          exceptionFactory: (errors: ValidationError[]) =>
            new BadRequestException({
              statusCode:
                ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
              message: 'http.clientError.badRequest',
              errors,
            }),
        }),
    },
    SkipConstraint,
    MinGreaterThanConstraint,
  ],
  imports: [],
})
export class RequestModule {}
