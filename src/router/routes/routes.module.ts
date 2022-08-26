import { Module } from '@nestjs/common';
import { CategoriesModule } from 'src/modules/categories/categories.module';

@Module({
  imports: [CategoriesModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class RoutesModule {}
