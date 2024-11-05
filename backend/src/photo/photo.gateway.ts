import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { PhotoService } from './photo.service';
import { SessionGuard } from 'src/session/session.guard';
import { UseGuards } from '@nestjs/common';
import { blobToBuffer } from 'src/utils/chat.utils';
import { Socket } from 'socket.io';
import * as fs from 'fs';
import { TelegramService } from 'src/telegram/telegram.service';

@UseGuards(SessionGuard)
@WebSocketGateway()
export class PhotoGateway {
  constructor(
    private readonly photoService: PhotoService,
    private readonly telegramService: TelegramService,
  ) {}
  // Отправка аудиофайла
  @SubscribeMessage('sendPhoto')
  async handlePhoto(client: Socket, payload: any) {
    if (
      !client.data.session ||
      !payload.userId ||
      !payload.fileBuffer ||
      !payload.fileName
    ) {
      console.log('no session or userId or fileBuffer or fileName');
      console.log('client.data.session', client.data.session);
      console.log('payload.userId', payload.userId);
      console.log('payload.fileBuffer', payload.fileBuffer);
      console.log('payload.fileName', payload.fileName);
      return;
    }

    const telegramInstance = this.telegramService.getTelegramClient(
      client.data.session,
    );

    const buffer = Buffer.from(payload.fileBuffer, 'base64'); // Предполагается, что fileBuffer закодирован в base64
    const filePath = 'photo.png';

    // Сохраняем аудиофайл временно на диск
    fs.writeFileSync(filePath, buffer);


    const result = await telegramInstance.sendFile(payload.userId, {
      file: filePath,
      // photo: true,
      message: payload.caption,
    });

    // client.emit('sendAudio', { status: 'success', data: result });
    fs.unlinkSync(filePath); // Удаление временного файла после отправки
  }
}
