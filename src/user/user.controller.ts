import { Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoIdPipe } from './mongo-id.pipe';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(createUserDto: CreateUserDto) {
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
}
