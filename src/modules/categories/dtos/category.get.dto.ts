import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CategoryGetDto {
  @IsNotEmpty()
  @IsMongoId()
  @Type(() => String)
  id: string;
}
