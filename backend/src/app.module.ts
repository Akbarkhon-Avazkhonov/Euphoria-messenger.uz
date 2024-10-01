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
import { RedisModule } from './redis/redis.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { TelegramService } from './telegram/telegram.service';
import { TelegramModule } from './telegram/telegram.module';
import { MessagesModule } from './messages/messages.module';
import { AudioModule } from './audio/audio.module';
import { FileModule } from './file/file.module';
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
    RedisModule,
    DialogsModule,
    TelegramModule,
    MessagesModule,
    AudioModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService, TelegramService],
})
export class AppModule {}
