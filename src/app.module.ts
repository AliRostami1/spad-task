import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpLoggerModule } from './http-logger/http-logger.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.getOrThrow<string>('MONGO_URI'),
          useUnifiedTopology: true,
          useNewUrlParser: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    HttpLoggerModule.register('http://localhost:3000/user'),
  ],
  controllers: [AppController],
})
export class AppModule {}
