import { Controller, Get, Param } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/test/:id')
  getTest(@Param() params: { id: string }) {
    // Question: how to declare params as an object with an id prop 'string' in it?
    // is it good?
    console.log(params.id);
    return this.appService.getTest(params.id);
  }
}
