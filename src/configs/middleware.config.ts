import { registerAs  } from '@nestjs/config';
import ms from 'ms';
import { ENUM_REQUEST_METHOD } from 'src/common/request/constants/request.enum.constantant';

export default registerAs(
  'middleware',
  (): Record<string, any> => ({
    cors: {
      allowMethod: [
        ENUM_REQUEST_METHOD.GET,
        ENUM_REQUEST_METHOD.DELETE,
        ENUM_REQUEST_METHOD.POST,
        ENUM_REQUEST_METHOD.PUT,
        ENUM_REQUEST_METHOD.PATCH,
      ],
      allowOrigin: '*',
      allowHeader: [
        'Accept',
        'Accept-Language',
        'Content-Language',
        'Content-Type',
        'Origin',
        'Authorization',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Credentials',
        'Access-Control-Expose-Headers',
        'Access-Control-Max-Age',
        'Referer',
        'Host',
        'X-Requested-With',
        'x-custom-lang',
        'x-timestamp',
        'x-api-key',
        'x-timezone',
        'x-request-id',
        'x-version',
        'x-repo-version',
        'X-Response-Time',
        'user-agent',
      ],
    },
    rateLimit: {
      resetTime: ms(500),
      maxRequestPerId: 1,
    },
    timestamp: {
      toleranceTimeInMs: process.env.MIDDLEWARE_TOLERANCE_TIMESTAMP
        ? ms(process.env.MIDDLEWARE_TOLERANCE_TIMESTAMP)
        : ms('30s'),
    },
    cache: {
      ttl: ms('30s'),
      max: 100,
    },
    timeout: {
      in: process.env.MIDDLEWARE_TIMEOUT
        ? ms(process.env.MIDDLEWARE_TIMEOUT)
        : ms('30s'),
    },
    userAgent: {
      os: ['Mobile', 'Mac OS', 'Windows', 'Unix', 'Linux', 'ios', 'Android'],
      browser: [
        'IE',
        'Safari',
        'Edge',
        'Opera',
        'Chrome',
        'Firefox',
        'Samsung Browser',
        'UCBrowser',
      ],
    },
  }),
);
