import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { PgModule } from './other/pg.modul';
@Module({
  imports: [PgModule, AuthModule, SessionModule, UsersModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
