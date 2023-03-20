import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getTest(id: string) {
    return `Testing Rout with Params: ${id}`;
  }
}
