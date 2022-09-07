import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoryService } from '../services/category.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCategoryExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly categoryService: CategoryService) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (!value) return true;

    return this.categoryService
      .findById(value)
      .then((category) => (category ? true : false));
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `Category not found for ${validationArguments.targetName}:${validationArguments.value}`;
  }
}

export function IsCategoryExist(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): any {
    registerDecorator({
      name: 'IsCategoryExist',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsCategoryExistConstraint,
    });
  }
}

