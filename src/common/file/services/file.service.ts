import { Injectable } from '@nestjs/common';
import path from 'path';
import { HelperIdentifierService } from 'src/common/helper/services/helper.identifier.service';
import { IFile, IFileUploadDetails } from '../file.interface';

@Injectable()
export class FileService {
  constructor(
    private readonly helperIdentifierService: HelperIdentifierService,
  ) {}
  
  getFileUploadDetails(file: IFile): IFileUploadDetails {
    const extension: string = path.extname(file.originalname);
    const uniqueId: string = this.helperIdentifierService.uniqueId();
    const filename = `${uniqueId}${extension}`;

    return {
      filename,
      content: file.buffer,
      mimeType: file.mimetype,
    }
  }
}
