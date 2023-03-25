import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
// better choice to use for hash & token refresh than 'bcrypt' node package
import { AuthDto } from './dto';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(authBody: AuthDto): Promise<Partial<User> | undefined> {
    try {
      // generate password hash
      const hash = await argon.hash(authBody.password);
      // save the user in db
      const userBody = { email: authBody.email, hash };
      const user = await this.prisma.user.create({
        data: userBody,
        select: { id: true, email: true, createdAt: true },
      });
      return user;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        // an error of Prisma for unique props
        // eslint-disable-next-line prettier/prettier
        console.log('There is a unique constraint violation, a new user cannot be created with this email');
        throw new ForbiddenException('Credentials taken');
      } else throw err; // an error from nestJs
    }
  }
  async signIn(authBody: AuthDto): Promise<string> {
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete user.hash;
      return this.signToken(user.id, user.email);
    } catch (err) {
      throw err;
    }
  }
  signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret,
    });
  }
}
