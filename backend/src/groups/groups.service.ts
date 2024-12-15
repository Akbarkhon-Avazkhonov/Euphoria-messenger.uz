import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PgService } from 'src/other/pg.service';

@Injectable()
export class GroupsService {
  constructor(private readonly pgService: PgService) {}

  async create(createGroupDto: CreateGroupDto) {
    const insertQuery = `
      INSERT INTO "Groups" (title, description)
      VALUES ('${createGroupDto.title}', '${createGroupDto.description}')
      RETURNING *;
    `;
    const group = await this.pgService.query(insertQuery);
    return group.rows[0];
  }

  async findAll() {
    const selectQuery = `
      SELECT * FROM "Groups";
    `;
    const groups = await this.pgService.query(selectQuery);
    return { data: groups.rows };
  }

  async findOne(id: number) {
    const selectQuery = `
        SELECT * FROM "Groups" WHERE id = ${id};
    `;
    const group = await this.pgService.query(selectQuery);
    return group.rows[0];
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  async remove(id: number) {
    const deleteQuery = `
          DELETE FROM "Groups" WHERE id = ${id};
    `;
    return await this.pgService.query(deleteQuery);
  }
}
