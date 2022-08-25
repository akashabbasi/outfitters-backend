import { DynamicModule, Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.module';
import { RouterModule as NestJSRouterModule } from '@nestjs/core';

@Module({})
export class RouterModule {
  static register(): DynamicModule {
    if (process.env.APP_HTTP_ON === 'true') {
      return {
        module: RouterModule,
        controllers: [],
        providers: [],
        exports: [],
        imports: [
          RoutesModule,
          NestJSRouterModule.register([
            {
              path: '/',
              module: RoutesModule,
            },
          ]),
        ],
      }
    }

    return {
      module: RouterModule,
      imports: [],
      controllers: [],
      providers: [],
      exports: [],
    }
  }
}
