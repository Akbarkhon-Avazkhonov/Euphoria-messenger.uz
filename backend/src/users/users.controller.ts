import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Auth } from 'src/auth/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto, UpdateUserPasswordDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth('admin')
  @Post('createUser')
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Auth()
  @Get('/profile')
  getProfile(@Request() req: { login: string }) {
    return this.usersService.getProfile(req.login);
  }

  @Auth()
  @Patch('/updatePassword')
  updatePassword(
    @Body() body: UpdateUserPasswordDto,
    @Request() req: { login: string },
  ) {
    return this.usersService.updatePassword(req.login, body);
  }

  @Auth('admin')
  @Patch('/updateProfile/:login')
  updateProfile(
    @Param('login') login: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(login, updateUserDto);
  }
}
