import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryCreateDto } from '../dtos/category.create.dto';

@Controller({
  version: '1',
  path: 'categories'
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CategoryCreateDto) {}
  
  async findAll() {}
  async findOne() {}
  async update() {}
  async toggleActiveStatus() {}
}