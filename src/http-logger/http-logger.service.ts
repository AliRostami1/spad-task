import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HttpLoggerService {
  constructor(@Inject('ENDPOINT') private endpoint: string) {}

  async send() {
    try {
      const res = await fetch(this.endpoint);
      const json = await res.json();
      Logger.log(json);
    } catch (error) {
      Logger.log(error);
    }
  }
}
