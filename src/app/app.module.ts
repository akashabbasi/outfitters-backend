import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { CommonModule } from 'src/common/common.module';
import { AppController } from './controllers/app.controller';

@Module({
  imports: [CommonModule, RouterModule],
  controllers: [AppController],
})
export class AppModule {}
