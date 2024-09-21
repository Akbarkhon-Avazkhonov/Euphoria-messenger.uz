import { HttpException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PgService } from 'src/other/pg.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    private readonly pgService: PgService,
    private jwtService: JwtService,
  ) {}

  async create(req: CreateAdminDto) {
    // create table user if not exists name varchar(255), login varchar(255), password varchar(60) , role enum('admin', 'user') default 'user' , primary key (login) , unique (login);
    const query_create_table = `
    CREATE TABLE IF NOT EXISTS "Users" (
      "name" VARCHAR(255),
      "login" VARCHAR(255),
      "password" VARCHAR(60),
      "role" VARCHAR(5) CHECK ("role" IN ('admin', 'user')) DEFAULT 'user',
      PRIMARY KEY ("login"),
      UNIQUE ("login")
    );
  
    CREATE INDEX IF NOT EXISTS idx_users_name ON "Users" ("name");
    CREATE INDEX IF NOT EXISTS idx_users_role ON "Users" ("role");
  `;
    await this.pgService.safeQuery(query_create_table, 'Users');

    const hashed_password = await bcrypt.hash(
      req.password,
      +process.env.BCRYPT_SALT,
    );
    const query = `
      INSERT INTO "Users" ("name", "login", "password", "role")
      SELECT '${req.name}', '${req.login}', '${hashed_password}', 'admin'
      WHERE NOT EXISTS (
          SELECT 1 FROM "Users" WHERE "login" = '${req.login}'
      );
    `;

    const result = await this.pgService.query(query);
    if (!result.rowCount) {
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        400,
      );
    } else {
      //generate token
      console.log('JWT Secret:', process.env.JWT_SECRET);
      const payload = { login: req.login, role: 'admin' };
      const access_token = await this.jwtService.signAsync(payload);
      return {
        message: 'Пользователь успешно создан',
        token: access_token,
      };
    }
  }

  async findAll() {
    const tableName = 'Operator'; // Динамическое имя таблицы (ввод пользователя или из переменной)

    const query = `SELECT * FROM "${tableName}"`; // Динамическое формирование запроса с именем таблицы

    const result = await this.pgService.safeQuery(query, tableName); // Выполняем запрос
    console.log(result.rows);
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
