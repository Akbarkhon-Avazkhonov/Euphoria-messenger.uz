import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { PgModule } from './other/pg.modul';
import { TgAuthModule } from './tg-auth/tg-auth.module';
import { RolesModule } from './roles/roles.module';
import { TablesModule } from './tables/tables.module';
@Module({
  imports: [
    PgModule,
    AuthModule,
    SessionModule,
    UsersModule,
    AdminModule,
    TgAuthModule,
    RolesModule,
    TablesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
