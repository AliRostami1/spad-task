import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find() {
    return await this.userModel.find({}, '-password');
  }

  async findById(id: string) {
    return await this.userModel.findById(id, '-password');
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email: email }, '-password');
  }

  async findByEmailUnsafe(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    return this.sanitizeUser(user);
  }

  sanitizeUser(user: UserDocument) {
    const dirty = user.toObject();
    const { password, ...sanitized } = dirty;
    return sanitized;
  }
}
