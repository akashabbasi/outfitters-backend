import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryCreateDto } from '../dtos/category.create.dto';
import { Response } from 'src/common/response/decorators/response.decorator';
import { CreateCategorySerialization } from '../serializations/create-category.serialization';
import { ICategory } from '../interfaces/category.interface';
import { IResponse } from 'src/common/response/response.interface';
import { UploadFileSingle } from 'src/common/file/decorators/file.decorator';

@Controller({
  version: '1',
  path: 'categories',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Response({
    classSerialization: CreateCategorySerialization,
  })
  @UploadFileSingle('image')
  @Post()
  async create(
    @Body() createCategoryDto: CategoryCreateDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .addMaxSizeValidator({
          maxSize: 2048,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
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
