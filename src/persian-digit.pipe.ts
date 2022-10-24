import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { digitsFaToEn } from '@persian-tools/persian-tools';

/**
 * converts any Persian digits inside an string
 * to it's English equivalent
 */
@Injectable()
export class PersianDigitPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && value['credit']) {
      // if its from body then we need to get the credit field
      // and convert that if exist
      value['credit'] = digitsFaToEn(value['credit']);
    } else if (typeof value === 'string') {
      // if its just an string, just convert it
      value = digitsFaToEn(value);
    } else {
      // throw an error if value is neither string nor has Body type
      return new BadRequestException('pipe can not handle this type of value');
    }
    return value;
  }
}
