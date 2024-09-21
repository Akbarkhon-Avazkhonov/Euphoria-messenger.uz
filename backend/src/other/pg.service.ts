import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Client } from 'pg';
import { HttpException } from '@nestjs/common';

@Injectable()
export class PgService implements OnModuleInit, OnModuleDestroy {
  private client: Client;

  constructor() {
    this.client = new Client({
      host: process.env.DB_HOST, // Хост базы данных
      port: +process.env.DB_PORT, // Порт PostgreSQL
      user: process.env.DB_USER, // Имя пользователя
      password: process.env.DB_PASSWORD, // Пароль
      database: process.env.DB_NAME, // Имя базы данных
    });
  }

  // host: process.env.DB_HOST, // Хост базы данных
  // port: process.env.DB_PORT, // Порт PostgreSQL
  // user: process.env.DB_USER, // Имя пользователя
  // password: process.env.DB_PASSWORD, // Пароль
  // database: process.env.DB_NAME, // Имя базы данных

  async onModuleInit() {
    await this.client.connect(); // Устанавливаем подключение при запуске модуля
  }

  async onModuleDestroy() {
    await this.client.end(); // Закрываем подключение при завершении работы модуля
  }

  async query(query: string, params?: any[]): Promise<any> {
    return this.client.query(query, params); // Выполнение SQL-запроса
  }

  async safeQuery(
    query: string,
    check: string = '',
    params?: any[],
  ): Promise<any> {
    // Проверяем, что запрос не содержит опасных символов
    if (!/^[a-zA-Z0-9_.,()'" ]+$/.test(check)) {
      throw new HttpException('Не пытайся взломать 😊', 418);
    }
    return this.client.query(query, params); // Выполнение SQL-запроса
  }
}
