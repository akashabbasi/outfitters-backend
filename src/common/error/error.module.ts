import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHttpFilter } from './filters/error.http.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorHttpFilter,
    }
  ]
})
export class ErrorModule {}
