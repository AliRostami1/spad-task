import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PersianDigitPipe } from 'src/persian-digit.pipe';
import { ChangeUserDto } from './dto/change-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoIdPipe } from './mongo-id.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * public
   * create a user
   * @param createUserDto
   * @returns the newly created user
   */
  @Post()
  async create(@Body(PersianDigitPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * private
   * get all users currently registered
   * @returns all users
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.find();
  }

  /**
   * public
   * get user with specified mongodb id
   * @param id
   * @returns a user
   */
  @Get(':id')
  async find(@Param('id', MongoIdPipe) id: string) {
    return this.userService.findById(id);
  }

  /**
   * public
   * update user creadit or profile picture
   * @param id
   * @param changeUserDto
   * @returns string stating if the update was successful
   */
  @Patch(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body(PersianDigitPipe) changeUserDto: ChangeUserDto,
  ) {
    return this.userService.update(id, changeUserDto);
  }
}
