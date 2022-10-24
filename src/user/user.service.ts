import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeUserDto } from './dto/change-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find() {
    return await this.userModel.find({}, '-password');
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id, '-password');
    if (!user) {
      throw new BadRequestException('user does not exist');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email }, '-password');
    if (!user) {
      throw new BadRequestException('user does not exist');
    }
    return user;
  }

  async findByEmailUnsafe(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new BadRequestException('user does not exist');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    let user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('user already exists');
    }

    user = await this.userModel.create(createUserDto);
    return this.sanitizeUser(user);
  }

  async update(id: string, changeUserDto: ChangeUserDto) {
    if (
      changeUserDto.credit !== undefined ||
      changeUserDto.picture !== undefined
    ) {
      const user = await this.findById(id);

      if (changeUserDto.credit) {
        changeUserDto.credit = (
          +user.credit + +changeUserDto.credit
        ).toString();
      }

      const result = await this.userModel.updateOne({ _id: id }, changeUserDto);
      if (result.modifiedCount > 0) {
        return 'user updated';
      }
    }
    return 'nothing happened';
  }

  sanitizeUser(user: UserDocument) {
    const dirty = user.toObject();
    const { _, ...sanitized } = dirty;
    return sanitized;
  }
}
