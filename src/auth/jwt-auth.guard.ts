import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard is used to check the existance and
 * validation of JWT token provided by clients in order
 * to authorize theeir access to private resources
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
