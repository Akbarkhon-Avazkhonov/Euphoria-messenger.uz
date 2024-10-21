import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
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
  @Get('all')
  getAll() {
    return this.usersService.getAll();
  }
  @Auth('admin')
  @Post('create-user')
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Auth()
  @Get('profile')
  getProfile(@Request() req: any) {
    return this.usersService.getProfile(req);
  }

  @Get('getOperators')
  getOperators() {
    return this.usersService.getOperators();
  }

  @Get('getOperatorsNotRop/:id')
  getOperatorsNotRop(@Param('id') id: string) {
    return this.usersService.getOperatorsNotRop(+id);
  }

  @Get('getRops')
  getRops() {
    return this.usersService.getRops();
  }

  @Get('getRopOperators/:id')
  getRopOperators(@Param('id') id: string) {
    return this.usersService.getRopOperators(+id);
  }

  @Post('addRopOperator/:ropId/:userId')
  addRopOperator(
    @Param('ropId') ropId: string,
    @Param('userId') userId: string,
  ) {
    return this.usersService.addRopOperator(+ropId, +userId);
  }

  @Delete('removeRopOperator/:ropId/:userId')
  removeRopOperator(
    @Param('ropId') ropId: string,
    @Param('userId') userId: string,
  ) {
    return this.usersService.removeRopOperator(+ropId, +userId);
  }

  @Auth()
  @Patch('update-password')
  updatePassword(
    @Body() body: UpdateUserPasswordDto,
    @Request() req: { login: string },
  ) {
    return this.usersService.updatePassword(req.login, body);
  }

  @Auth('admin')
  @Patch('update-profile/:login')
  updateProfile(
    @Param('login') login: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(login, updateUserDto);
  }
}
