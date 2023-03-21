import { MinLength, MaxLength, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @MinLength(6)
  @MaxLength(15)
  @IsNotEmpty()
  password: string;
}
