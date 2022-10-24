import { Controller, Get } from '@nestjs/common';
import { HttpLoggerService } from './http-logger/http-logger.service';

@Controller()
export class AppController {
  constructor(private httpLoggerService: HttpLoggerService) {}

  /**
   * public
   * send uses HttpLoggerService's send method to send
   * a GET request to specified Endpoint, which in this
   * case is http://localhost:3000/user
   */
  @Get('send')
  send() {
    this.httpLoggerService.send();
  }
}
