import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre('save', async function (next) {
            try {
              if (!this.isModified('password')) {
                return next();
              }
              const hashed = await hash(this['password'], 10);
              this['password'] = hashed;
              return next();
            } catch (err) {
              return next(err);
            }
          });

          schema.methods.validatePassword = function (plainPassword: string) {
            return compare(plainPassword, this['password']);
          };

          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
