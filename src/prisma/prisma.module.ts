import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
// by writing th Global decorator we're making this module available for the entire app -
// just make sure it's imported to the appModule
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
