import { Exclude, Type } from 'class-transformer';

export class CreateCategorySerialization {
  @Type(() => String)
  readonly _id: string;

  readonly name: string;
  readonly description: string;
  readonly isActive: boolean;
  readonly imageUrl: string;
  
  @Type(() => String)
  readonly parentCategory?: string;

  readonly createdAt: Date;

  @Exclude()
  readonly updatedAt: Date;
}
