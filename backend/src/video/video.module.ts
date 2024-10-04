import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoGateway } from './video.gateway';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [TelegramModule], // Добавьте TelegramModule в imports
  providers: [VideoGateway, VideoService],
})
export class VideoModule {}
