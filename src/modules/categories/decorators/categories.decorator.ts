import { applyDecorators } from '@nestjs/common';
import { UploadSingleFile } from 'src/common/file/decorators/file.decorator';
import { CATEGORY_IMAGE_UPLOAD_CONSTRAINTS } from '../constants/category.constant';

export function UploadCategoryImage(fieldName: string): any {
  return applyDecorators(
    UploadSingleFile({
      fieldName,
      allowedMimeTypes: CATEGORY_IMAGE_UPLOAD_CONSTRAINTS.ALLOWED_MIME_TYPES,
    }),
  );
}
