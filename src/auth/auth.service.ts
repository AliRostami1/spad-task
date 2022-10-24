import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmailUnsafe(email);
    if (user && (await compare(password, user.password))) {
      return user;
    }
    return null;
  }

  /**
   * create a JWT token with user's info (non-sensitive ofcourse)
   * @param user
   * @returns JWT token
   */
  async login(user: UserDocument) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
