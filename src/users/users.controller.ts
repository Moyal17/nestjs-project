import { Controller, UseGuards, Get } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { ReqUser } from '../auth/decorator';
import { User } from '@prisma/client';

// @UseGuards(JwtGuard) putting the guard above all will use it in ALL of the routes inside the controller
@Controller('users')
export class UsersController {
  @Get()
  findAllUsers(): string {
    return 'get all users';
  }
  @UseGuards(JwtGuard)
  @Get('me')
  findUserInfo(@ReqUser() user: User): string {
    console.log('req.user ', user);
    return 'get My Info';
  }
}
