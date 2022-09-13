import {
  PipeTransform,
  Injectable,
  PayloadTooLargeException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENUM_FILE_STATUS_CODE_ERROR } from '../constants/file.status-code.constant';
import { IFile } from '../file.interface';

@Injectable()
export class FileSizeImagePipe implements PipeTransform {
  constructor(private readonly configService: ConfigService) {}

  async transform(value: IFile | IFile[]): Promise<IFile | IFile[]> {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      for (const val of value) {
        await this.validate(val.size);
      }

      return value;
    }

    const file: IFile = value as IFile;
    await this.validate(file.size);

    return value;
  }

  async validate(size: number): Promise<void> {
    const maxSizeOnBytes = this.configService.get<number>(
      'file.image.maxFileSize',
    );

    if (size > maxSizeOnBytes) {
      const megaBytes = maxSizeOnBytes / (1024 ** 2);
      throw new PayloadTooLargeException({
        statusCode: ENUM_FILE_STATUS_CODE_ERROR.FILE_MAX_SIZE_ERROR,
        message: `Max File size allowed is ${megaBytes}MB`,
      });
    }

    return;
  }
}
