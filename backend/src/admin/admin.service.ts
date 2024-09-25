import { HttpException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
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
        'Пользователь с таким логином уже существует 🤷‍♂️',
        400,
      );
    } else {
      //generate token
      const payload = { login: req.login, role: 'admin' };
      const access_token = await this.jwtService.signAsync(payload);
      return {
        message: 'Пользователь успешно создан 👍',
        token: access_token,
      };
    }
  }
}
