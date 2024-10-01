// telegram.module.ts
import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Module({
  providers: [TelegramService],
  exports: [TelegramService], // Экспортируем сервис, чтобы он был доступен в других модулях
})
export class TelegramModule {}
