import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { VideoService } from './video.service';
import { TelegramService } from 'src/telegram/telegram.service';
import { SessionGuard } from 'src/session/session.guard';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';
import * as fs from 'fs';
@UseGuards(SessionGuard)
@WebSocketGateway()
@WebSocketGateway()
export class VideoGateway {
  constructor(
    private readonly videoService: VideoService,
    private readonly telegramService: TelegramService,
  ) {}

  // Отправка видеофайла
  @SubscribeMessage('sendVideo')
  async handleVideo(client: Socket, payload: any) {
    console.log('handleVideo');
    if (!client.data.session || !payload.userId || !payload.duration) {
      console.log('no session or userId or blob or duration');
      console.log('client.data.session', client.data.session);
      console.log('payload.userId', payload.userId);
      console.log('payload.duration', payload.duration);
      return;
    }
    const telegramInstance = this.telegramService.getTelegramClient(
      client.data.session,
    );

    const buffer = Buffer.from(payload.fileBuffer, 'base64'); // Предполагается, что fileBuffer закодирован в base64
    const filePath = 'video.mp4';
    console.log('filePath', filePath);

    // Сохраняем аудиофайл временно на диск
    fs.writeFileSync(filePath, buffer);

    const result = await telegramInstance.sendFile(payload.userId, {
      file: filePath,
      videoNote: true,
      message: payload.caption,
    });
    console.log('result', result);

    // client.emit('sendAudio', { status: 'success', data: result });
    // fs.unlinkSync(filePath); // Удаление временного файла после отправки
  }
}
