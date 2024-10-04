import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { AudioService } from './audio.service';
import { SessionGuard } from 'src/session/session.guard';
import { UseGuards } from '@nestjs/common';
import { TelegramService } from 'src/telegram/telegram.service';
import { Api } from 'telegram';
import { blobToBuffer } from 'src/utils/chat.utils';
import { Socket } from 'socket.io';
import * as fs from 'fs';

@UseGuards(SessionGuard)
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class AudioGateway {
  constructor(
    private readonly audioService: AudioService,
    private readonly telegramService: TelegramService, // Inject TelegramService
  ) {}

  // Отправка аудиофайла
  @SubscribeMessage('sendAudio')
  async handleAudio(client: Socket, payload: any) {
    if (
      !client.data.session ||
      !payload.userId ||
      !payload.blob ||
      !payload.duration
    ) {
      client.emit(
        'error',
        'No session or userId or blob or caption or duration',
      );
      client.emit('error', 'client.data.session', client.data.session);
      client.emit('error', 'payload.userId', payload.userId);
      client.emit('error', 'payload.blob', payload.blob);
      client.emit('error', 'payload.caption', payload.caption);
      client.emit('error', 'payload.duration', payload.duration);
      return;
    }
    const telegramInstance = this.telegramService.getTelegramClient(
      client.data.session,
    );
    if (!telegramInstance) {
      client.emit('error', 'Telegram instance not found');
      return;
    }

    const buffer: any = await blobToBuffer(payload.blob);
    const filePath = 'audio.mp3';

    // Сохраняем аудиофайл временно на диск
    fs.writeFileSync(filePath, buffer);

    const result = await telegramInstance.sendFile(payload.userId, {
      file: filePath,
      voiceNote: true,
      message: payload.caption,
      attributes: [
        new Api.DocumentAttributeAudio({
          voice: true,
          duration: payload.duration,
        }),
      ],
    });

    // fs.unlinkSync(filePath); // Удаление временного файла после отправки
  }
}
