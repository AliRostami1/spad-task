import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  ],
  providers: [AppService],
})
export class AppModule {}
