import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PgService } from 'src/other/pg.service';

@Injectable()
export class RolesService {
  constructor(private readonly pgService: PgService) {}
  async create(body: CreateRoleDto) {
    const query = `
      INSERT INTO "Roles" (name, access, description)
      VALUES ('${body.name}' , '${JSON.stringify(body.access)}', '${body.description}')
      RETURNING *;
    `;
    await this.pgService.query(query);
    return {
      message: 'Роль успешно создана',
    };
  }

  async findAll() {
    const query = `
      SELECT * FROM "Roles";
    `;
    const result = await this.pgService.query(query);
    return {
      message: 'Список ролей',
      data: result.rows,
    };
  }

  async findSome(take: number, skip: number) {
    const query = `
      SELECT * FROM "Roles" LIMIT ${take} OFFSET ${skip};
    `;
    const result = await this.pgService.query(query);
    return {
      message: `Список ролей (take: ${take}, skip: ${skip})`,
      data: result.rows,
    };
  }
  async findOne(id: number) {
    const query = `
      SELECT * FROM "Roles" WHERE id = ${id};
    `;
    const result = await this.pgService.query(query);
    if (!result.rows[0]) {
      throw new HttpException('Роль не найдена 👀', 404);
    }
    return {
      message: 'Роль найдена',
      data: result.rows[0],
    };
  }

  async update(id: number, body: UpdateRoleDto) {
    const query = `
      UPDATE "Roles" SET name = '${body.name}', access = '${JSON.stringify(body.access)}', description = '${body.description}'
      WHERE id = ${id}
      RETURNING *;
    `;
    const result = await this.pgService.query(query);
    if (!result.rows[0]) {
      throw new HttpException('Роль не найдена 👀', 404);
    }
    return {
      message: 'Роль успешно обновлена',
      data: result.rows[0],
    };
  }

  async remove(id: number) {
    const query = `
      DELETE FROM "Roles" WHERE id = ${id};
    `;
    await this.pgService.query(query);

    return {
      message: 'Роль успешно удалена',
    };
  }
}
