import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PgService } from 'src/other/pg.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserPasswordDto, UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly pgService: PgService) {}
  async getAll() {
    const query = `
  SELECT 
    u."login", 
    u."name", 
    u."role",
    u."created_at",
    t."phoneNumber" ,
    t."verified"
  FROM "Users" u
  LEFT JOIN "TgUsers" t ON u."id" = t."user_id";
`;
    const result = await this.pgService.query(query);

    return {
      message: 'Список пользователей',
      data: result.rows,
    };
  }
  async getSome(take: number, skip: number) {
    const query = `
    SELECT 
      u."login", 
      u."name", 
      u."role",
      u."created_at",
      t."phoneNumber", 
    FROM "Users" u
    LEFT JOIN "TgUsers" t ON u."id" = t."user_id"
    ORDER BY u."created_at" DESC
    LIMIT ${take} OFFSET ${skip};
  `;
    const result = await this.pgService.query(query);

    return {
      message: 'Список пользователей',
      data: result.rows,
    };
  }
  async create(body: CreateUserDto) {
    const query = `
      SELECT * FROM "Users" WHERE "login" = '${body.login}';
    `;
    const result = await this.pgService.query(query);
    if (result.rowCount) {
      throw new HttpException('Пользователь уже существует', 400);
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const insertQuery = `
      INSERT INTO "Users" (name, login, password, role)
      VALUES ('${body.name}', '${body.login}', '${hashedPassword}', '${body.role}')
      RETURNING login;
    `;
    await this.pgService.query(insertQuery);
    return {
      message: 'Пользователь успешно создан',
      data: body.login,
    };
  }

  async getProfile(req: any) {
    const query = `
      SELECT  name, login, role FROM "Users" WHERE "login" = '${req.login}';
    `;
    const result = await this.pgService.query(query);
    return {
      message: 'Профиль пользователя',
      data: result.rows[0],
      access: req.access,
    };
  }

  async getOperators() {
    const query = `
    SELECT 
    u."id",
u."login", 
u."name", 
u."role",
u."created_at",
t."phoneNumber",
t."verified"
FROM "Users" u
LEFT JOIN "TgUsers" t ON u."id" = t."user_id"
LEFT JOIN "Roles" r ON u."role" = r."name"
WHERE r."access" ->> 'can_manage_users' = 'false';
  `;
    const result = await this.pgService.query(query);

    return {
      message: 'Список операторов',
      data: result.rows,
    };
  }
  async getRops() {
    const query = `
      SELECT 
      u."id",
  u."login", 
  u."name", 
  u."role",
  u."created_at",
  t."phoneNumber",
  t."verified"
FROM "Users" u
LEFT JOIN "TgUsers" t ON u."id" = t."user_id"
LEFT JOIN "Roles" r ON u."role" = r."name"
WHERE r."access" ->> 'can_manage_users' = 'true';
    `;
    const result = await this.pgService.query(query);

    return {
      message: 'Список пользователей',
      data: result.rows,
    };
  }

  async getRopOperators(id: number) {
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
      LEFT JOIN "Rops" r ON u."id" = r."operator_id"
      WHERE r."rop_id" = $1
    `;
    const result = await this.pgService.query(query, [id]);
    return {
      message: 'Операторы РОП',
      data: result.rows,
    };
  }

  async getOperatorsNotRop(id: number) {
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
      LEFT JOIN "Rops" r ON u."id" = r."operator_id" AND r."rop_id" = $1
      WHERE r."rop_id" IS NULL;
    `;

    const result = await this.pgService.query(query, [id]);
    return {
      message: 'Операторы не связанные с этим РОПом',
      data: result.rows,
    };
  }

  async addRopOperator(ropId: number, userId: number) {
    // First, check if the Rop-Operator pair already exists
    const checkQuery = `
      SELECT COUNT(*)
      FROM "Rops"
      WHERE "rop_id" = $1 AND "operator_id" = $2;
    `;

    const checkResult = await this.pgService.query(checkQuery, [ropId, userId]);
    const count = parseInt(checkResult.rows[0].count, 10);

    if (count > 0) {
      return {
        message: 'Уже существует', // Return this message if the pair already exists
      };
    }

    // If not already existing, insert the new Rop-Operator pair
    const insertQuery = `
      INSERT INTO "Rops" (rop_id, operator_id)
      VALUES ($1, $2);
    `;

    await this.pgService.query(insertQuery, [ropId, userId]);

    return {
      message: 'Оператор успешно добавлен',
    };
  }

  async removeRopOperator(ropId: number, userId: number) {
    const query = `
      DELETE FROM "Rops"
      WHERE "rop_id" = $1 AND "operator_id" = $2;
    `;
    await this.pgService.query(query, [ropId, userId]);
    return {
      message: 'Оператор успешно удален',
    };
  }

  async updatePassword(login: string, body: UpdateUserPasswordDto) {
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const query = `
        UPDATE "Users" SET  password = '${hashedPassword}'
        WHERE login = '${login}';
      `;
      await this.pgService.query(query);
    } else {
      throw new HttpException('Пароль не может быть пустым', 400);
    }
    return {
      message: 'Профиль успешно обновлен',
    };
  }

  async updateProfile(login: string, body: UpdateUserDto) {
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const query = `
        UPDATE "Users" SET  password = '${hashedPassword}'
        WHERE login = '${login}';
      `;
      await this.pgService.query(query);
    }
    if (body.name) {
      const query = `
        UPDATE "Users" SET  name = '${body.name}'
        WHERE login = '${login}';
      `;
      await this.pgService.query(query);
    }
    if (body.role) {
      const query = `
        UPDATE "Users" SET  role = '${body.role}'
        WHERE login = '${login}';
      `;
      await this.pgService.query(query);
    }
    return {
      message: 'Профиль успешно обновлен',
      data: login,
      password: body.password,
    };
  }
}
