import { Module } from '@nestjs/common';
import { HttpLoggerService } from './http-logger.service';

@Module({})
export class HttpLoggerModule {
  static register(endpoint: string) {
    return {
      module: HttpLoggerModule,
      providers: [
        { provide: 'ENDPOINT', useValue: endpoint },
        HttpLoggerService,
      ],
      exports: [HttpLoggerService],
    };
  }
}
