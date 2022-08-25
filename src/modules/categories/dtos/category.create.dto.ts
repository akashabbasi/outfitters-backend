import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
  IsMongoId,
} from 'class-validator';
import { IsCategoryExist } from '../validators/category-exist.validator';

export class CategoryCreateDto {
  @IsEmail()
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
  @Length(24)
  @Type(() => String)
  parentCategory: string;
}
