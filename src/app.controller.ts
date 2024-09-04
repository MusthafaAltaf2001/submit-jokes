import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @MessagePattern('get-all-jokes')
  // @Get()
  // async findAll() {
  //   return this.jokesService.findAll();
  // }
}
