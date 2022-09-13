import { Injectable, NestMiddleware } from '@nestjs/common';
import bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UrlencodedBodyParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    bodyParser.urlencoded({ extended: true })(req, res, next);
  }
}

@Injectable()
export class JsonBodyParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    bodyParser.json()(req, res, next);
  }
}

@Injectable()
export class RawBodyParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    bodyParser.raw()(req, res, next);
  }
}

@Injectable()
export class TextBodyParserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    bodyParser.text()(req, res, next);
  }
}
