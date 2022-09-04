import { Global, Module } from '@nestjs/common';
import { HelperDateService } from './services/helper.date.service';
import { HelperIdentifierService } from './services/helper.identifier.service';

@Global()
@Module({
  providers: [HelperIdentifierService, HelperDateService],
  exports: [HelperIdentifierService, HelperDateService],
  imports: [],
})
export class HelperModule {}
