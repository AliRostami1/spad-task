import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserDocument } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() { user }: { user: UserDocument }) {
    return this.authService.login(user);
  }
}
