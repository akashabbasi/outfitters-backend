import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ENUM_REQUEST_STATUS_CODE_ERROR } from '../constants/request.status-code.constant';
import { IRequestApp } from '../request.interface';

@Injectable()
export class PayloadExistGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: IRequestApp = context.switchToHttp().getRequest();
    console.log(request.body);
    if (!request.body && !request.file && !request.files) {
      throw new HttpException(
        {
          statusCode: ENUM_REQUEST_STATUS_CODE_ERROR.REQUEST_VALIDATION_ERROR,
          message: 'At least 1 field/file required to update',
          error: 'http.clientError.badRequest',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }
}
