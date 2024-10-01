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
    origin: 'http://localhost:3000',
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
      !payload.caption ||
      !payload.duration
    )
      return;

    const telegramInstance = this.telegramService.getTelegramClient(
      client.data.session,
    );
    if (!telegramInstance) {
      client.emit('error', 'Telegram instance not found');
      return;
    }

    const buffer: any = await blobToBuffer(payload.blob);
    const filePath = 'audio.ogg';

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

    client.emit('sendAudio', { status: 'success', data: result });
    fs.unlinkSync(filePath); // Удаление временного файла после отправки
  }
}
