import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get('getAllUsers')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('getUserSession/:id')
  async getUserSession(@Param('id') id: string) {
    return this.adminService.getUserSession(+id);
  }
}
