import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  JsonBodyParserMiddleware,
  RawBodyParserMiddleware,
  TextBodyParserMiddleware,
  UrlencodedBodyParserMiddleware,
} from './body-parser/body-parser.middleware';
import { CompressionMiddleware } from './compression/compression.middleware';
import { CorsMiddleware } from './cors/cors.middleware';
import { HelmetMiddleware } from './helmet/helmet.middleware';
import { RateLimitMiddleware } from './rate-limit/rate-limit.middleware';
import { RequestIdMiddleware } from './request-id/request-id.middleware';
import { ResponseTimeMiddleware } from './response-time/response-time.middleware';
import { UserAgentMiddleware } from './user-agent/user-agent.middleware';
import { VersionMiddleware } from './version/version.middleware';

@Module({})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        RequestIdMiddleware,
        JsonBodyParserMiddleware,
        RawBodyParserMiddleware,
        TextBodyParserMiddleware,
        UrlencodedBodyParserMiddleware,
        CompressionMiddleware,
        CorsMiddleware,
        HelmetMiddleware,
        RateLimitMiddleware,
        UserAgentMiddleware,
        ResponseTimeMiddleware,
        VersionMiddleware,
      )
      .forRoutes('*');
  }
}
