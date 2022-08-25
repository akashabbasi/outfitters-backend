import { Module } from '@nestjs/common';
import { CategoryModule } from 'src/modules/categories/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class RoutesModule {}
