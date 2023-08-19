import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user-dto';
import { UsersService } from '../service/users.service';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/createUser')
  createUser(@Body() nweUser: CreateUserDto) {
    return this.usersService.createUser(nweUser);
  }

  @Get('findAll')
  findUserAll() {
    return this.usersService.findUserAll();
  }

  @Get('findUserOne/:id')
  findUserOne(@Param('id') id: number) {
    return this.usersService.findUserOne(+id);
  }

  @Patch('updateUser/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete('deleteUser/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(+id);
  }

  @Post('createProfile/:id')
  createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateProfileDto,
  ) {
    return this.usersService.createProfile(id, profile);
  }
}
