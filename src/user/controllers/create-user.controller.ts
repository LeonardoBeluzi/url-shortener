import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserService } from '../services/create-user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@ApiTags('User')
@Controller('user')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    await this.createUserService.execute(createUserDto);
  }
}
