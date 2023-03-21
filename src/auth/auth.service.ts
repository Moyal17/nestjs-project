import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
// better choice to use for hash & token refresh than 'bcrypt' node package
import { AuthDto } from './dto';
import { Prisma, User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async signUp(
    authBody: AuthDto,
  ): Promise<{ id: number; email: string; createdAt: Date } | undefined> {
    try {
      // generate password hash
      const hash = await argon.hash(authBody.password);
      // save the user in db
      const userBody = { email: authBody.email, hash };
      const user = await this.prisma.user.create({
        data: userBody,
        select: { id: true, email: true, createdAt: true },
      });
      console.log('User ', user);
      return user;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      )
        // an error of Prisma for unique props
        throw new ForbiddenException('Credentials taken');
      else throw err; // an error from nestJs
    }
  }
  async signIn(authBody: AuthDto): Promise<User | undefined> {
    try {
      // find user in db > else throw error 'user not found'
      const user = await this.prisma.user.findUnique({
        where: {
          email: authBody.email,
        },
      });
      if (!user) throw new ForbiddenException('User not found');
      // compare password with hash > else throw error 'password is incorrect please try again'
      const matchPass = await argon.verify(user.hash, authBody.password);
      if (!matchPass) throw new ForbiddenException('Incorrect Password');
      // @ts-ignore
      delete user.hash;
      return user;
    } catch (err) {
      throw err;
    }
  }
}
