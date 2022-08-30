import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes('*');
  }
}
