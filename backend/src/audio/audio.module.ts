import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioGateway } from './audio.gateway';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [TelegramModule], // Добавьте TelegramModule в imports
  providers: [AudioGateway, AudioService],
})
export class AudioModule {}
