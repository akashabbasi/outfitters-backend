import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorHttpFilter } from './filters/error.http.filter';
import { ErrorMetadataInterceptor } from './interceptors/error.metadata.interceptor';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorHttpFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorMetadataInterceptor
    }
  ]
})
export class ErrorModule {}
