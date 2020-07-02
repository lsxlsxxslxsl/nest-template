import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('index')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }
}
