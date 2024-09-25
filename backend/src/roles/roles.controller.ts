import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  create(
    @Body()
    body: CreateRoleDto,
  ) {
    return this.rolesService.create(body);
  }

  @Get('all')
  findAll() {
    return this.rolesService.findAll();
  }

  @Get('some/:take/:skip')
  findSome(@Param('take') take: string, @Param('skip') skip: string) {
    return this.rolesService.findSome(+take, +skip);
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch('one/:id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete('one/:id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
