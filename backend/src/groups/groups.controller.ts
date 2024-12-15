import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post('create')
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get('all')
  findAll() {
    return this.groupsService.findAll();
  }

  @Get('group/:id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Get('getGroupUsers/:id')
  getGroupUsers(@Param('id') id: string) {
    return this.groupsService.getGroupUsers(+id);
  }

  @Post('addUser/:groupId/:userId')
  addRopOperator(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    return this.groupsService.addUser(+groupId, +userId);
  }

  @Patch('update/:group_id')
  update(
    @Param('group_id') group_id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupsService.update(+group_id, updateGroupDto);
  }

  @Delete('removeGroupUser/:groupId/:userId')
  removeGroupUser(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    return this.groupsService.removeGroupUser(+groupId, +userId);
  }

  @Delete('group/:id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
