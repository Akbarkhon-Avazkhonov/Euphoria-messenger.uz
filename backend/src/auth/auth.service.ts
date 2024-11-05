import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/create-auth.dto';
import { PgService } from 'src/other/pg.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly pgService: PgService,
    private jwtService: JwtService,
  ) {}
  async login(body: LoginAuthDto) {
    const query = `
  SELECT u.*, r.* , u.id as id
  FROM "Users" u
  JOIN "Roles" r ON u."role" = r."name" 
  WHERE u.login = '${body.login}';
`;
    const result = await this.pgService.query(query);

    if (!result.rowCount) {
      throw new HttpException('Пользователь не найден 👀', 404);
    }
    const user = result.rows[0];
    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new HttpException('Неверный пароль 🚫', 400);
    }
    // get session from tg-users
    const sessionQuery = await this.pgService.query(
      `SELECT * FROM "TgUsers" WHERE "user_id" = '${user.id}';`,
    );

    if (sessionQuery.rowCount) {
      const session = sessionQuery.rows[0].session;
      const payload = {
        user_id: user.id,
        role: user.role,
        access: user.access,
      };
      const token = await this.jwtService.signAsync(payload);
      const jwtSession = await this.jwtService.signAsync({ session });
      return {
        message: 'Вход выполнен успешно 👍',
        id: user.id,
        token,
        session: jwtSession,
        access: user.access,
        role: user.role.toString(),
      };
    } else {
      const payload = {
        user_id: user.id,
        role: user.role,
        access: user.access,
      };
      const token = await this.jwtService.signAsync(payload);
      return {
        message: 'Вход выполнен успешно 👍',
        id: user.id,
        token,
        role: user.role.toString(),
        access: user.access,
      };
    }
  }
}
