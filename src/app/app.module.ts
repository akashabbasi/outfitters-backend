import { Module } from '@nestjs/common';
import { RouterModule } from 'src/router/router.module';
import { CommonModule } from 'src/common/common.module';
import { AppController } from './controllers/app.controller';

@Module({
  imports: [CommonModule, RouterModule.register()],
  controllers: [AppController],
})
export class AppModule {}
