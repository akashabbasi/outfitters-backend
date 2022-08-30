export interface ICategory {
  _id?: string;
  name: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  parentCategory?: string;
}
