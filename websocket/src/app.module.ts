import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MessagesModule } from './messages/messages.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, MessagesModule, ChatModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
