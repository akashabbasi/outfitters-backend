import { UnsupportedMediaTypeException } from '@nestjs/common';
import { IRequestApp } from 'src/common/request/request.interface';
import { ENUM_FILE_STATUS_CODE_ERROR } from '../constants/file.status-code.constant';

export function fileMimeTypeFilter(mimeTypes: string[]) {
  return (
    req: IRequestApp,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new UnsupportedMediaTypeException({
          statusCode: ENUM_FILE_STATUS_CODE_ERROR.FILE_EXTENSION_ERROR,
          message: 'file.error.mimeInvalid',
        }),
        false,
      );
    }
  };
}
