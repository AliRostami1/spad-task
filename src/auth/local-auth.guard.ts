import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * LocalAuthGuard is used to check username and
 * password proviced by user with actual stored
 * inforamtion inside database in order to authenticate
 * users and provice JWT token to them
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
