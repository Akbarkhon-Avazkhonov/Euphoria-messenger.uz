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
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PhotoModule } from './photo/photo.module';
import { VideoModule } from './video/video.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    DevtoolsModule.register({
      port: 4000,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the uploads directory
      serveRoot: '/uploads', // URL path to serve the files from
    }),
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
    PhotoModule,
    VideoModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TelegramService],
})
export class AppModule {}
