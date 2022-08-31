import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { IFile } from '../file.interface';

export class FileMaxFilesPipes implements PipeTransform {
  async transform(
    value: IFile[],
    metadata: ArgumentMetadata,
  ): Promise<IFile[]> {
    if (value) {
      await this.validate(value);
    }
    return value;
  }

  async private validate(value: IFile[]): Promise<void> {}
}
