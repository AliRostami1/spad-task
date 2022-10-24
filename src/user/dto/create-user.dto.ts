import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: number;

  @IsNotEmpty()
  credit: string;

  picture: string;
}
