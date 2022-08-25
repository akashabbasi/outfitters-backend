import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { CategoryController } from './controllers/category.controller';
import {
  Category,
  CategoryCollectionName,
  CategorySchema,
} from './schemas/category.schema';
import { CategoryService } from './services/category.service';
import { IsCategoryExistConstraint } from './validators/category-exist.validator';
@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Category.name,
          schema: CategorySchema,
          collection: CategoryCollectionName,
        },
      ],
      DATABASE_CONNECTION_NAME,
    ),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, IsCategoryExistConstraint],
})
export class CategoryModule {}
