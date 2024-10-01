import { Module } from '@nestjs/common';
import { DialogsService } from './dialogs.service';
import { DialogsGateway } from './dialogs.gateway';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [TelegramModule], // Добавьте TelegramModule в imports
  providers: [DialogsGateway, DialogsService],
})
export class DialogsModule {}
