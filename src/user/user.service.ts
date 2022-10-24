import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeUserDto } from './dto/change-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   *  get all users from db
   * @returns all users currently registered (without password field)
   */
  async find() {
    return await this.userModel.find({}, '-password');
  }

  /**
   * get a user by it's id from db
   * @param id
   * @returns user info (without password field)
   */
  async findById(id: string) {
    const user = await this.userModel.findById(id, '-password');
    if (!user) {
      throw new BadRequestException('user does not exist');
    }
    return user;
  }

  /**
   * get a user by it's email from db
   * @param email
   * @returns user info (without password field)
   */
  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email }, '-password');
    if (!user) {
      throw new BadRequestException('user does not exist');
    }
    return user;
  }

  /**
   * get a user by it's email from db
   * CAUTION: this method should not be used anywhere
   * except when we are authenticating users, use
   * sanitizeUser method to sanitize the result before
   * sending them to client
   * @param email
   * @returns user info (WITH PASSWORD field)
   */
  async findByEmailUnsafe(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new BadRequestException('user does not exist');
    }
    return user;
  }

  /**
   * create a user if does not exists already
   * @param createUserDto
   * @returns newly created user
   */
  async create(createUserDto: CreateUserDto) {
    let user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('user already exists');
    }

    user = await this.userModel.create(createUserDto);
    return this.sanitizeUser(user);
  }

  /**
   * update a user credit or picture fields
   * @param id
   * @param changeUserDto
   * @returns status of update
   */
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

  /**
   * remove password field from user
   * @param user
   * @returns user without password field
   */
  sanitizeUser(user: UserDocument) {
    const dirty = user.toObject();
    const { _, ...sanitized } = dirty;
    return sanitized;
  }
}
