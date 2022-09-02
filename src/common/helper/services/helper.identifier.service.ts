import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class HelperIdentifierService {
  uniqueId(): string {
    return v4();
  }
}
