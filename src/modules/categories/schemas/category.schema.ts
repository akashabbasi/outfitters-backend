import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export const CategoryCollectionName = 'categories';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Category {
  @Prop({
    required: true,
    index: true,
    lowercase: true,
    trim: true,
  })
  name: string;

  @Prop({
    trim: true,
  })
  description: string;

  @Prop({
    required: true,
    trim: true,
    match: [
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
      'Invalid image url',
    ],
  })
  imageUrl: string;

  @Prop({
    default: true,
  })
  isActive: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: CategoryCollectionName,
  })
  parentCategory: Category;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export type CategoryDocument = Category & Document;