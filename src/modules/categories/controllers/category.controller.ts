import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryCreateDto } from '../dtos/category.create.dto';
import { Response } from 'src/common/response/decorators/response.decorator';
import { CreateCategorySerialization } from '../serializations/create-category.serialization';
import { IResponse } from 'src/common/response/response.interface';
import { CategoryDocument } from '../schemas/category.schema';
import { ENUM_CATEGORY_STATUS_CODE_SUCCESS } from '../constants/category.status-code.constant';
import { ICategory } from '../interfaces/category.interface';

@Controller({
  version: '1',
  path: 'categories'
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Response({
    classSerialization: CreateCategorySerialization
  })
  @Post()
  async create(
    @Body() createCategoryDto: CategoryCreateDto,
  ): Promise<IResponse> {
    const category: ICategory = await this.categoryService.create(
      createCategoryDto,
    );
    return {
      metadata: {
        message: 'Category created successfully',
      },
      ...category
    };
  }
  
  async findAll() {}
  async findOne() {}
  async update() {}
  async toggleActiveStatus() {}
}