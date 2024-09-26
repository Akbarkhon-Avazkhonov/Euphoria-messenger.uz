import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PgService } from 'src/other/pg.service';
import { telegramClient } from 'src/other/telegramClient';
import { Api } from 'telegram';

@Injectable()
export class TgAuthService {
  constructor(private readonly pgService: PgService) {}

  async register(login: string, phoneNumber: string) {
    // find user by phone number or if not exists create table tgusers
    try {
      const query_find_user = `
       -- Проверяем существует ли пользователь с таким телефоном
        SELECT * FROM "TgUsers" WHERE "phoneNumber" = '${phoneNumber}';
        `;
      const user = await this.pgService.query(query_find_user);
      if (user.rowCount) {
        return `Такой номер уже используется 📵`;
      }

      const query = `
        -- Добавляем нового пользователя в таблицу Tg-Users
        INSERT INTO "TgUsers" ("phoneNumber", "login")
        SELECT '${phoneNumber}', '${login}'
        WHERE NOT EXISTS (
            SELECT 1 FROM "TgUsers" WHERE "phoneNumber" = '${phoneNumber}'
        );
        `;
      await this.pgService.query(query);
    } catch {
      throw new HttpException('Ошибка при регистрации', HttpStatus.BAD_REQUEST);
    }

    // send code to the phone number
    try {
      const client = await telegramClient(''); // Create new Telegram client
      const { phoneCodeHash } = await client.sendCode(
        {
          apiId: +process.env.API_ID,
          apiHash: process.env.API_HASH,
        },
        phoneNumber,
      );
      console.log('phoneCodeHash', phoneCodeHash);

      const session = client.session.save();

      // Use parameterized query to safely insert or update a user
      const query = `
  INSERT INTO "TgUsers" ("phoneNumber", "phoneCodeHash", "session", "login")
  VALUES ($1, $2, $3, $4)
  ON CONFLICT ("phoneNumber") 
  DO UPDATE SET 
    "phoneCodeHash" = EXCLUDED."phoneCodeHash",
    "session" = EXCLUDED."session",
    "login" = EXCLUDED."login";
`;

      // Execute the query with values
      await this.pgService.query(query, [
        phoneNumber,
        phoneCodeHash,
        session,
        login,
      ]);

      // Disconnect the Telegram client after the operation
      await client.disconnect();

      return {
        message: 'Код отправлен на номер 📲',
        phoneNumber: phoneNumber,
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async verify(login: string, phoneCode: string) {
    try {
      // find user by login
      const query_find_user = `
        SELECT * FROM "TgUsers" WHERE "login" = '${login}';
        `;
      const user = await this.pgService.query(query_find_user);
      console.log('user', user.rows[0]);
      if (!user.rowCount) {
        throw new HttpException(
          `Пользователь не найден 🤷‍♂️`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const client = await telegramClient(user.rows[0].session);
      try {
        await client.invoke(
          new Api.auth.SignIn({
            phoneNumber: user.rows[0].phoneNumber,
            phoneCodeHash: user.rows[0].phoneCodeHash,
            phoneCode: phoneCode,
          }),
        );
        const newSession = client.session.save();
        // update user session
        await this.pgService.query(
          `UPDATE "TgUsers"
          SET "session" = '${newSession}',
              "verified" = TRUE
          WHERE "login" = '${login}';`,
        );

        if (client.isUserAuthorized()) {
          await client.disconnect();
          return {
            message: 'Пользователь успешно  зарегистрирован 🎉',
            session: newSession,
          };
        } else {
          throw new HttpException('PHONE_CODE_INVALID', HttpStatus.BAD_REQUEST);
        }
      } catch (e) {
        throw new HttpException(e, HttpStatus.BAD_GATEWAY);
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async refreshCode(login: string) {
    // find user by phone number or if not exists create table tgusers
    let phoneNumber = '';
    try {
      const query_find_user = `
           -- Проверяем существует ли пользователь с таким login
            SELECT * FROM "TgUsers" WHERE "login" = '${login}';
            `;
      const user = await this.pgService.query(query_find_user);
      if (!user.rowCount) {
        throw new HttpException(
          'Пользователь не найден 🤷‍♂️',
          HttpStatus.BAD_REQUEST,
        );
      }
      phoneNumber = user.rows[0].phoneNumber;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
    // send code to the phone number
    try {
      const client = await telegramClient(''); // create new telegram client
      const { phoneCodeHash } = await client.sendCode(
        {
          apiId: +process.env.API_ID,
          apiHash: process.env.API_HASH,
        },
        phoneNumber,
      );
      const session = client.session.save();
      // add user phone number to the table tg-users
      const query = `
       -- Обновляем запись в таблице TgUsers для существующего пользователя по login
      UPDATE "TgUsers"
      SET "phoneCodeHash" = '${phoneCodeHash}',
          "session" = '${session}'
      WHERE "login" = '${login}';
      `;
      await client.disconnect();
      await this.pgService.query(query);

      return {
        message: ' Код отправлен на номер 📲 ',
        phoneNumber: phoneNumber,
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
