import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileGateway } from './file.gateway';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [TelegramModule], // Добавьте TelegramModule в imports
  providers: [FileGateway, FileService],
})
export class FileModule {}
