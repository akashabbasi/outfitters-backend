import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CategoryCreateDto } from '../dtos/category.create.dto';
import {
  Response,
  ResponsePaging,
} from 'src/common/response/decorators/response.decorator';
import { CreateCategorySerialization } from '../serializations/category.create.serialization';
import { ICategory } from '../interfaces/category.interface';
import {
  IResponse,
  IResponsePaging,
} from 'src/common/response/response.interface';
import { IFile } from 'src/common/file/file.interface';
import { UploadCategoryImage } from '../decorators/categories.decorator';
import { FileSizeImagePipe } from 'src/common/file/pipes/file.size.pipe';
import { FileRequiredPipe } from 'src/common/file/pipes/file.required.pipe';
import { CategoryListDto } from '../dtos/category.list.dto';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { CategoryDocument } from '../schemas/category.schema';
import { CategoryListSerialization } from '../serializations/category.list.serialization';

@Controller({
  version: '1',
  path: 'categories',
})
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly paginationService: PaginationService,
  ) {}

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
    const category: ICategory = await this.categoryService.create(
      createCategoryDto,
      file,
    );
    return {
      metadata: {
        message: 'Category created successfully',
      },
      ...category,
    };
  }

  @Get()
  @ResponsePaging({
    classSerialization: CategoryListSerialization,
  })
  async findAll(
    @Query()
    {
      page,
      perPage,
      sort,
      search,
      availableSearch,
      availableSort,
    }: CategoryListDto,
  ): Promise<IResponsePaging> {
    const skip: number = await this.paginationService.skip(page, perPage);
    const find: Record<string, any> = {
      ...search,
    };

    const result: [CategoryDocument[], number] = await Promise.all([
      this.categoryService.findAll(find, {
        limit: perPage,
        skip,
        sort,
      }),
      this.categoryService.getTotal(find),
    ]);
    const categories: CategoryDocument[] = result[0];
    const totalData: number = result[1];

    const totalPage: number = await this.paginationService.totalPage(
      totalData,
      perPage,
    );

    return {
      totalData,
      totalPage,
      currentPage: page,
      perPage,
      availableSearch,
      availableSort,
      data: categories,
    };
  }

  async findOne() {}
  async update() {}
  async toggleActiveStatus() {}
}
