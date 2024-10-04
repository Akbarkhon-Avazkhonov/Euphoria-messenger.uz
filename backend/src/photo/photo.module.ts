import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoGateway } from './photo.gateway';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [TelegramModule], // Добавьте TelegramModule в imports
  providers: [PhotoGateway, PhotoService],
})
export class PhotoModule {}
