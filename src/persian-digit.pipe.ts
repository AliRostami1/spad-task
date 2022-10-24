import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { digitsFaToEn } from '@persian-tools/persian-tools';

@Injectable()
export class PersianDigitPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && value['credit']) {
      value['credit'] = digitsFaToEn(value['credit']);
    } else if (typeof value === 'string') {
      value = digitsFaToEn(value);
    } else {
      return new BadRequestException('pipe can not handle this type of value');
    }
    return value;
  }
}
