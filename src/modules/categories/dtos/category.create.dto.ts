import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { IsCategoryExist } from '../validators/category-exist.validator';

export class CategoryCreateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Type(() => String)
  name: string;

  @IsString()
  @MinLength(10)
  @MaxLength(255)
  @Type(() => String)
  description: string;

  @IsCategoryExist()
  @IsMongoId()
  @Type(() => String)
  @IsOptional()
  parentCategory: string;
}
