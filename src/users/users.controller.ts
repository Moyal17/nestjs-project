import { Controller, UseGuards, Get, Patch, Body } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { ReqUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UsersService } from './users.service';

// @UseGuards(JwtGuard) putting the guard above all will use it in ALL the routes inside the controller
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtGuard)
  @Get()
  findUserById(@ReqUser('id') userId: number): Promise<Partial<User> | null> {
    return this.usersService.getUserById(userId);
  }
  @UseGuards(JwtGuard)
  @Get('me')
  findUserInfo(@ReqUser() user: User): string {
    return `get My Info: ${JSON.stringify(user)}`;
  }
  @UseGuards(JwtGuard)
  @Patch()
  editUser(
    @ReqUser('id') id: number,
    @Body() user: EditUserDto,
  ): Promise<Partial<User>> {
    return this.usersService.editUser(id, user);
  }
}
