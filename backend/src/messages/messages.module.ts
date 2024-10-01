import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [TelegramModule], // Добавьте TelegramModule в imports
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
