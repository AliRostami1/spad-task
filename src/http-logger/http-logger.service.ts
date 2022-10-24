import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HttpLoggerService {
  constructor(@Inject('ENDPOINT') private endpoint: string) {}

  /**
   * send a GET request to endpoint provided during
   * Module initialization
   */
  async send() {
    try {
      const res = await fetch(this.endpoint);
      const json = await res.json();
      Logger.log(json);
      return 'logged the result, check logs';
    } catch (error) {
      Logger.log(error);
      return 'something went wrong, check logs';
    }
  }
}
