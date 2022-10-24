import { Controller, Get } from '@nestjs/common';
import { HttpLoggerService } from './http-logger/http-logger.service';

@Controller()
export class AppController {
  constructor(private httpLoggerService: HttpLoggerService) {}

  @Get('send')
  send() {
    this.httpLoggerService.send();
  }
}
