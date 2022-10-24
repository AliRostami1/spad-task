import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([1-9۱-۹]*)$/, {
    message: 'credit can only be engish and persian numbers',
  })
  credit: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  picture: string;
}
