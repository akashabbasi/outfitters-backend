import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { Model } from 'mongoose';
import path from 'path';
import { CategoryCreateDto } from '../dtos/category.create.dto';
import { IFile } from 'src/common/file/file.interface';
import { ConfigService } from '@nestjs/config';
import { ICategory } from '../interfaces/category.interface';
import { AwsS3Service } from 'src/common/aws/services/aws.s3.service';
import { HelperIdentifierService } from 'src/common/helper/services/helper.identifier.service';
import { IAwsS3 } from 'src/common/aws/aws.interface';
import { IDatabaseFindAllOptions } from '../../../common/database/database.interface';

@Injectable()
export class CategoryService {
  private readonly uploadPath: string;

  constructor(
    private readonly configService: ConfigService,
    @DatabaseEntity(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    private readonly helperIdentifierService: HelperIdentifierService,
    private readonly awsS3Service: AwsS3Service,
  ) {
    this.uploadPath = this.configService.get<string>('category.uploadPath');
  }

  async create(
    createCategoryDto: CategoryCreateDto,
    file: IFile,
  ): Promise<ICategory> {
    // upload image to s3
    const content: Buffer = file.buffer;
    const extension: string = path.extname(file.originalname);
    const uniqueId: string = this.helperIdentifierService.uniqueId();
    const filename = `${uniqueId}${extension}`;
    const uploadedItem: IAwsS3 = await this.awsS3Service.putItemInBucket(
      filename,
      content,
      file.mimetype,
      {
        path: `${this.uploadPath}`,
      },
    );

    const category: CategoryDocument = new this.categoryModel({
      ...createCategoryDto,
      imageUrl: uploadedItem.completedUrl,
    });
    return (await category.save()).toObject();
  }

  async findOne() {}

  async findById(id: string): Promise<ICategory> {
    return (await this.categoryModel.findById(id)).toObject();
  }

  async findAll(
    find?: Record<string, any>,
    options?: IDatabaseFindAllOptions,
  ): Promise<CategoryDocument[]> {
    const categories = this.categoryModel
      .find(find)
      .populate({ path: 'parentCategory', model: Category.name });

    if (options && options.limit !== undefined && options.skip !== undefined) {
      categories.limit(options.limit).skip(options.skip);
    }

    if (options && options.sort) {
      categories.sort(options.sort);
    }

    return categories.lean();
  }

  async getTotal(find?: Record<string, any>): Promise<number> {
    return this.categoryModel.countDocuments(find);
  }
}
