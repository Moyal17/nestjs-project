import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {User} from "@prisma/client";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin() {
    return 'I am signing In';
  }
  @Post('signup')
  signup(): string {
    return 'I am signing UP';
  }
}
