import { Global, Module } from '@nestjs/common';
import { HelperIdentifierService } from './services/helper.identifier.service';

@Global()
@Module({
  providers: [HelperIdentifierService],
  exports: [HelperIdentifierService],
  imports: [],
})
export class HelperModule {}
