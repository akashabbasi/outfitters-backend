import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { RequestModule } from 'src/common/request/request.module';
import Configs from 'src/configs';
import { DatabaseOptionsModule } from 'src/common/database/database.module';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { DatabaseOptionsService } from 'src/common/database/services/database.options.service';
import { ENUM_MESSAGE_LANGUAGE } from 'src/common/message/constants/message.enum.constant';
import { ResponseModule } from 'src/common/response/response.module';
import { MiddlewareModule } from 'src/common/middleware/middleware.module';
import { ErrorModule } from 'src/common/error/error.module';
import { HelperModule } from 'src/common/helper/helper.module';
import { PaginationModule } from './pagination/pagination.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required(),
        APP_ENV: Joi.string()
          .valid('development', 'production')
          .default('development')
          .required(),
        APP_MODE: Joi.string()
          .valid('simple', 'secure')
          .default('simple')
          .required(),
        APP_LANGUAGE: Joi.string()
          .valid(...Object.values(ENUM_MESSAGE_LANGUAGE))
          .default('en')
          .required(),
        APP_TZ: Joi.any().default('Asia/Karachi').required(),
        APP_HOST: [
          Joi.string().ip({ version: 'ipv4' }).required(),
          Joi.valid('localhost').required(),
        ],
        APP_PORT: Joi.number().default(3000).required(),
        APP_VERSIONING: Joi.boolean().default(true).required(),
        APP_DEBUG: Joi.boolean().default(true).required(),

        APP_HTTP_ON: Joi.boolean().default(true).required(),
        APP_JOB_ON: Joi.boolean().default(false).required(),

        DATABASE_HOST: Joi.any()
          .default('mongodb://localhost:27017')
          .required(),
        DATABASE_NAME: Joi.any().default('ack').required(),
        DATABASE_USER: Joi.any().optional(),
        DATABASE_PASSWORD: Joi.any().optional(),
        DATABASE_DEBUG: Joi.boolean().default(false).required(),
        DATABSE_OPTIONS: Joi.any().optional(),

        MIDDLEWARE_TOLERANCE_TIMESTAMP: Joi.string().default('5m').required(),
        MIDDLEWARE_TIMEOUT: Joi.string().default('30s').required(),

        AUTH_JWT_ACCESS_TOKEN_SECRET_KEY: Joi.string()
          .alphanum()
          .min(5)
          .max(50)
          .required(),
        AUTH_JWT_ACCESS_TOKEN_EXPIRED: Joi.string().default('30m').required(),
        AUTH_JWT_REFRESH_TOKEN_SECRET_KEY: Joi.string()
          .alphanum()
          .min(5)
          .max(50)
          .required(),
        AUTH_JWT_REFRESH_TOKEN_EXPIRED: Joi.string().default('7d').required(),
        AUTH_JWT_REFRESH_TOKEN_REMEMBER_ME_EXPIRED: Joi.string()
          .default('30d')
          .required(),
        AUTH_BASIC_TOKEN_CLIENT_ID: Joi.string().optional(),
        AUTH_BASIC_TOKEN_CLIENT_SECRET: Joi.string().optional(),

        AWS_CREDENTIAL_KEY: Joi.string().optional(),
        AWS_CREDENTIAL_SECRET: Joi.string().optional(),
        AWS_S3_REGION: Joi.string().optional(),
        AWS_S3_BUCKET: Joi.string().optional(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    // WinstonModule.forRootAsync({
    //   inject: [],
    //   imports: [],
    //   useFactory: (debuggerOptionService: DebuggerOptionService) =>
    //     debuggerOptionService.createLogger(),
    // }),
    MongooseModule.forRootAsync({
      connectionName: DATABASE_CONNECTION_NAME,
      imports: [DatabaseOptionsModule],
      inject: [DatabaseOptionsService],
      useFactory: (databaseOptionsService: DatabaseOptionsService) =>
        databaseOptionsService.createMongooseOptions(),
    }),
    HelperModule,
    FileModule,
    PaginationModule,
    ErrorModule,
    ResponseModule,
    RequestModule,
    MiddlewareModule,
  ],
  providers: []
})
export class CommonModule {}
