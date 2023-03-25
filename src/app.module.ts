import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from './config/config';
@Module({
  imports: [
    MongooseModule.forRoot(config.mongoUri),
    ConfigModule.forRoot({ isGlobal: true }),
    ItemsModule,
    AuthModule,
    PrismaModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
