import { Injectable, OnModuleInit } from '@nestjs/common';
import { PgService } from 'src/other/pg.service';

@Injectable()
export class TablesService implements OnModuleInit {
  constructor(private readonly pgService: PgService) {}

  async onModuleInit() {
    await this.createRoles();
    await this.createDefaultRoles(); // This should run after creating the Roles table
    await this.createUsers();
    await this.createDefaultUsers();
    await this.createTgUsers();
    await this.createRops();
  }

  // Создание таблицы Roles
  async createRoles() {
    const query_create_table = `
    CREATE TABLE IF NOT EXISTS "Roles" (
      "id" SERIAL PRIMARY KEY,  -- Автоматический идентификатор
      "name" VARCHAR(255) UNIQUE,  -- Уникальная роль пользователя
      "access" JSONB,  -- Права доступа в формате JSON
      "description" VARCHAR(255) DEFAULT '',  -- Описание роли
      "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Дата создания
    );

    -- Добавляем индекс для оптимизации поиска по имени в таблице Roles
    CREATE INDEX IF NOT EXISTS idx_roles_name ON "Roles" ("name");
    `;
    await this.pgService.safeQuery(query_create_table, 'Roles');
  }

  // Создание ролей по умолчанию
  async createDefaultRoles() {
    const query_insert_roles = `
    INSERT INTO "Roles" (name, access, description)
    VALUES
      ('Админ', '{
        "can_manage_users": true,
        "can_write": true,
        "can_delete": true,
        "can_read": true,
        "can_send_audio": true,
        "can_read_audio": true,
        "can_send_video": true,
        "can_read_video": true,
        "can_send_photo": true,
        "can_read_photo": true,
        "can_send_file": true,
        "can_read_file": true,
        "can_create_group": true
      }', 'Администратор'),
      ('Оператор', '{
        "can_manage_users": false,
        "can_write": true,
        "can_delete": false,
        "can_read": true,
        "can_send_audio": false,
        "can_read_audio": false,
        "can_send_video": false,
        "can_read_video": false,
        "can_send_photo": false,
        "can_read_photo": false,
        "can_send_file": false,
        "can_read_file": false,
        "can_create_group": true
      }', 'Пользователь'),
      ('РОП', '{
        "can_manage_users": true,
        "can_write": true,
        "can_delete": false,
        "can_read": true,
        "can_send_audio": false,
        "can_read_audio": false,
        "can_send_video": false,
        "can_read_video": false,
        "can_send_photo": false,
        "can_read_photo": false,
        "can_send_file": false,
        "can_read_file": false,
        "can_create_group": false
      }', 'РОП')
    ON CONFLICT (name) DO NOTHING;  -- Avoid duplicates
    `;

    await this.pgService.safeQuery(query_insert_roles, 'InsertDefaultRoles');
  }

  // Создание таблицы Users с внешним ключом на таблицу Roles
  async createUsers() {
    const query_create_table = `
    CREATE TABLE IF NOT EXISTS "Users" (
      "id" SERIAL PRIMARY KEY,
      "name" VARCHAR(255),
      "login" VARCHAR(255) UNIQUE,
      "password" VARCHAR(60),
      "role" VARCHAR(255),  -- Здесь оставляем 'role' для связи с таблицей Roles
      "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      -- Внешний ключ для связи с таблицей Roles
      FOREIGN KEY ("role") REFERENCES "Roles"("name") ON DELETE SET NULL
    );

    CREATE INDEX IF NOT EXISTS idx_users_name ON "Users" ("name");
    CREATE INDEX IF NOT EXISTS idx_users_role ON "Users" ("role");
    `;
    await this.pgService.safeQuery(query_create_table, 'Users');
  }

  async createDefaultUsers() {
    const query_insert_users = `
    INSERT INTO "Users" (name, login, password, role)
    VALUES
      ('Главный админ', 'admin', '$2a$10$UfYmSCVDFovTdfKwWjJjxenQpXVfYjfI0W7hDOcNqTKDV7kO8xRZu', 'Админ')
    ON CONFLICT (login) DO NOTHING;  -- Avoid duplicates
    `;
    await this.pgService.query(query_insert_users);
  }

  // Создание таблицы TgUsers с внешним ключом на таблицу Users
  async createTgUsers() {
    const query_create_table = `
    CREATE TABLE IF NOT EXISTS "TgUsers" (
      "id" SERIAL PRIMARY KEY,
      "phoneNumber" VARCHAR(20) UNIQUE,
      "phoneCodeHash" VARCHAR(255),
      "session" VARCHAR(511),
      "verified" BOOLEAN DEFAULT FALSE,
      "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "user_id" INTEGER,  -- Используем user_id для связи с таблицей Users
      -- Внешний ключ для связи с таблицей Users
      FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_tg_users_user_id ON "TgUsers" ("user_id");
    `;
    await this.pgService.safeQuery(query_create_table, 'TgUsers');
  }

  async createRops() {
    const query_create_table = `
    CREATE TABLE IF NOT EXISTS "Rops" (
      "id" SERIAL PRIMARY KEY,
      "rop_id" INTEGER,
      "operator_id" INTEGER,
      "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY ("rop_id") REFERENCES "Users"("id") ON DELETE CASCADE,
      FOREIGN KEY ("operator_id") REFERENCES "Users"("id") ON DELETE CASCADE
    );
    `;
    await this.pgService.safeQuery(query_create_table, 'Rops');
  }
}
