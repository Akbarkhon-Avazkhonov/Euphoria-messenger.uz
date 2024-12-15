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

  async getGroupUsers(id: number) {
    const query = `
      SELECT
      u."id",
        u."login",
        u."name",
        u."role",
        u."created_at",
        tg."phoneNumber"
      FROM "Users" u
      LEFT JOIN "TgUsers" tg ON u."id" = tg."user_id"
      LEFT JOIN "GroupsUsers" g ON u."id" = g."user_id"
      WHERE g."group_id" = $1
    `;
    const result = await this.pgService.query(query, [id]);
    return {
      message: 'Пользователи группы',
      data: result.rows,
    };
  }
  async addUser(groupId: number, userId: number) {
    // First, check if the Rop-Operator pair already exists
    const checkQuery = `
      SELECT COUNT(*)
      FROM "GroupsUsers"
      WHERE "group_id" = $1 AND "user_id" = $2;
    `;

    const checkResult = await this.pgService.query(checkQuery, [
      groupId,
      userId,
    ]);
    const count = parseInt(checkResult.rows[0].count, 10);

    if (count > 0) {
      return {
        message: 'Уже существует', // Return this message if the pair already exists
      };
    }

    // If not already existing, insert the new Group-User pair
    const insertQuery = `
      INSERT INTO "GroupsUsers" (group_id, user_id)
      VALUES ($1, $2);
    `;

    await this.pgService.query(insertQuery, [groupId, userId]);

    return {
      message: 'Оператор успешно добавлен',
    };
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const updateQuery = `
      UPDATE "Groups"
      SET 
        title = '${updateGroupDto.title}', 
        description = '${updateGroupDto.description}'
      WHERE id = ${id}
      RETURNING *;
    `;

    const updatedGroup = await this.pgService.query(updateQuery);
    return updatedGroup.rows[0];
  }

  async removeGroupUser(groupId: number, userId: number) {
    const deleteQuery = `
      DELETE FROM "GroupsUsers" WHERE "group_id" = $1 AND "user_id" = $2;
    `;

    await this.pgService.query(deleteQuery, [groupId, userId]);

    return {
      message: 'Пользователь успешно удален',
    };
  }
  async remove(id: number) {
    const deleteQuery = `
          DELETE FROM "Groups" WHERE id = ${id};
    `;
    return await this.pgService.query(deleteQuery);
  }
}
