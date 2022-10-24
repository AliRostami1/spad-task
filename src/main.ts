import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // activate global validation, using class-validator DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      // for security reasons
      forbidUnknownValues: true,
      // remove unwanted fields
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
