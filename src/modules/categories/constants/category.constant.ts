import { ENUM_FILE_IMAGE_MIME } from 'src/common/file/constants/file.enum.constant';

export const CATEGORY_IMAGE_UPLOAD_CONSTRAINTS = {
  ALLOWED_MIME_TYPES: [
    ENUM_FILE_IMAGE_MIME.JPEG,
    ENUM_FILE_IMAGE_MIME.JPG,
    ENUM_FILE_IMAGE_MIME.PNG,
  ],
};
