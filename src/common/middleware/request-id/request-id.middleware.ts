import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { IRequestApp } from 'src/common/request/request.interface';
import { v4 } from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  async use(
    req: IRequestApp,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const id: string = v4();
    req.headers['x-request-id'] = id;
    req.id = id;
    next();
  }
}
