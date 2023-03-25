import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  getUserById(id: number): Promise<Partial<User> | null> {
    const data = this.prisma.user.findUnique({
      where: { id },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    console.log(data);
    return data;
  }
  editUser(id: number, userBody: EditUserDto): Promise<Partial<User>> {
    return this.prisma.user.update({
      where: { id },
      data: { ...userBody },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
      // Question: Either use 'select' or delete the user.hash before returning?
    });
  }
}
