import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { Model } from 'mongoose';
import { CategoryCreateDto } from '../dtos/category.create.dto';
import { ICategory } from '../interfaces/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @DatabaseEntity(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CategoryCreateDto): Promise<ICategory> {
    const category: CategoryDocument = new this.categoryModel({
      ...createCategoryDto,
      imageUrl:
        'https://bluemoon.s3.amazonaws.com/0839473-hflkjdoeuri-0938.jpg',
    });
    return (await category.save()).toObject();
  }

  async findOne() {}

  async findById(id: string): Promise<any> {
    return this.categoryModel.findById(id);
  }
}