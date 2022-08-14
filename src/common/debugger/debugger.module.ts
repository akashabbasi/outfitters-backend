import { Global, Module } from '@nestjs/common';
import { DebuggerService } from './services/debugger.service';
import { DebuggerOptionService } from './services/debugger.option.service';

@Module({
  imports: [],
  providers: [DebuggerService, DebuggerOptionService],
  exports: [DebuggerService, DebuggerOptionService],
})
export class DebuggerOptionsModule {}

@Global()
@Module({
  imports: [],
  providers: [DebuggerService],
  exports: [DebuggerService],
})
export class DebuggerModule {}
