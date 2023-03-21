import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  // Question: what's the differance between a class AuthDto in dto file to an Auth Interface?
  signup(
    @Body() authBody: AuthDto,
  ): Promise<{ id: number; email: string; createdAt: Date } | undefined> {
    return this.authService.signUp(authBody);
  }
  @Post('signin')
  signin(@Body() authBody: AuthDto): Promise<User | undefined> {
    return this.authService.signIn(authBody);
  }
}
