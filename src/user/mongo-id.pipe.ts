import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

/**
 * MongoIdPipe checks if the value passed to it
 * is a valid MongoDB ObjectId and returns the
 * value untouched
 */
@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException('ID is not valid');
    }
    return value;
  }
}
