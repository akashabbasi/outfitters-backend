import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from '../constants/request.status-code.constant';
import { IRequestApp } from '../request.interface';

@Injectable()
export class PayloadExistGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: IRequestApp = context.switchToHttp().getRequest();

    if (!request.body.length && !request.file && !request.files) {
      throw new BadRequestException({
        statusCode: ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
        message: 'At least 1 field/file required to update',
        error: 'http.clientError.badRequest',
      });
    }
    return true;
  }
}
