import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @DatabaseEntity(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create() {}

  async findOne() {}

  async findById(id: string): Promise<any> {
    return this.categoryModel.findById(id);
  }
}