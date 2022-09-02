import { registerAs } from '@nestjs/config';

export default registerAs(
  'category',
  (): Record<string, any> => ({
    uploadPath: '/categories',
  }),
);
