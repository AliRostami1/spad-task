import { IsString, Matches, IsUrl, IsOptional } from 'class-validator';

export class ChangeUserDto {
  @IsString()
  @IsOptional()
  @Matches(/^([1-9۱-۹]*)$/, {
    message: 'credit can only be engish and persian numbers',
  })
  credit: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  picture: string;
}
