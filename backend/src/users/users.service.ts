import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PgService } from 'src/other/pg.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserPasswordDto, UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly pgService: PgService,
    private jwtService: JwtService,
  ) {}
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
      VALUES ('${body.name}', '${body.login}', '${hashedPassword}', 'user')
      RETURNING login;
    `;
    await this.pgService.query(insertQuery);
    return {
      message: 'Пользователь успешно создан',
      data: body.login,
    };
  }

  async getProfile(login: string) {
    const query = `
      SELECT  name, login, role FROM "Users" WHERE "login" = '${login}';
    `;
    const result = await this.pgService.query(query);
    return {
      message: 'Профиль пользователя',
      data: result.rows[0],
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
