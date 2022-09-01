import { Body, Controller, Post, UploadedFile } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryCreateDto } from '../dtos/category.create.dto';
import { Response } from 'src/common/response/decorators/response.decorator';
import { CreateCategorySerialization } from '../serializations/create-category.serialization';
import { ICategory } from '../interfaces/category.interface';
import { IResponse } from 'src/common/response/response.interface';
import { IFile } from 'src/common/file/file.interface';
import { UploadCategoryImage } from '../decorators/categories.decorator';
import { FileSizeImagePipe } from 'src/common/file/pipes/file.size.pipe';
import { FileRequiredPipe } from 'src/common/file/pipes/file.required.pipe';

@Controller({
  version: '1',
  path: 'categories',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Response({
    classSerialization: CreateCategorySerialization,
  })
  @UploadCategoryImage('image')
  @Post()
  async create(
    @Body() createCategoryDto: CategoryCreateDto,
    @UploadedFile(FileRequiredPipe, FileSizeImagePipe)
    file: IFile,
  ): Promise<IResponse> {
    console.log(file);
    const category: ICategory = await this.categoryService.create(
      createCategoryDto,
    );
    return {
      metadata: {
        message: 'Category created successfully',
      },
      ...category,
    };
  }

  async findAll() {}
  async findOne() {}
  async update() {}
  async toggleActiveStatus() {}
}
