import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AppService, User } from './app.service';

class CreateUserDto {
  name: string
}

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  find(): User[] {
    return this.appService.find();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number): User {
    return this.appService.findById(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    const { name } = body
    const newUser = this.appService.create(name)

    return newUser
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() body: CreateUserDto) {
    const { name } = body
    const updatedUser = this.appService.update(id, name)

    return updatedUser
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): { deleted: number } {
    return this.appService.delete(id);
  }
}