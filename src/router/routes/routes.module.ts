import { Module } from '@nestjs/common';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { AwsModule } from 'src/common/aws/aws.module';

@Module({
  imports: [CategoriesModule, AwsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class RoutesModule {}
