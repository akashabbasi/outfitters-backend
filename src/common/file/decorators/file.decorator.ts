import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ISingleFileUploadOptions } from '../file.interface';
import { fileMimeTypeFilter } from '../utils/file.multer.util';

export function UploadSingleFile(options: ISingleFileUploadOptions): any {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(options.fieldName, {
        fileFilter: fileMimeTypeFilter(options.allowedMimeTypes),
      }),
    )
  );
}
