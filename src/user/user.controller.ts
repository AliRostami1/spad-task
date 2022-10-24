import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PersianDigitPipe } from 'src/persian-digit.pipe';
import { ChangeUserDto } from './dto/change-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoIdPipe } from './mongo-id.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body(PersianDigitPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  async find(@Param('id', MongoIdPipe) id: string) {
    return this.userService.findById(id);
  }

  @Get()
  async findAll() {
    return this.userService.find();
  }

  @Patch(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body(PersianDigitPipe) changeUserDto: ChangeUserDto,
  ) {
    return this.userService.update(id, changeUserDto);
  }
}
