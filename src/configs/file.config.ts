import { registerAs } from '@nestjs/config';
import bytes from 'bytes';

export default registerAs(
  'file',
  (): Record<string, any> => ({
    image: {
      maxFileSize: bytes('100 KB'),
      maxFiles: 3
    },
    excel: {
      maxFileSize: bytes('5mb'),
      maxFiles: 1,
    },
    audio: {
      maxFileSize: bytes('10mb'),
      maxFiles: 1
    },
    vidoe: {
      maxFileSize: bytes('25mb'),
      maxFiles: 1
    },
  })
);