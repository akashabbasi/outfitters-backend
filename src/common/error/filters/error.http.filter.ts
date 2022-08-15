import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { DebuggerService } from 'src/common/debugger/services/debugger.service';

@Catch(HttpException)
export class ErrorHttpFilter implements ExceptionFilter {
  constructor(
    private readonly messageService: MessageService,
    private readonly debuggerService: DebuggerService,
  ) {

  }
}