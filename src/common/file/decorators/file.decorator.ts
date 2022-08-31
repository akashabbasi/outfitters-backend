import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export function UploadFileSingle(field: string): any {
  return applyDecorators(UseInterceptors(FileInterceptor(field)));
}
