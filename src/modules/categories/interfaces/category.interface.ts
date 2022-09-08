import { IFile } from 'src/common/file/file.interface';
import { CategoryUpdateDto } from '../dtos/category.update';

export interface ICategory {
  _id?: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  parentCategory?: string;
}

export interface ICategoryUpdate {
  update: CategoryUpdateDto;
  file: IFile;
}
