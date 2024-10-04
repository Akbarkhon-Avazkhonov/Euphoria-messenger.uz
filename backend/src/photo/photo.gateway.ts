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
    console.log('handlePhoto');
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
    console.log('client.data.session', client.data.session);

    console.log('sendPhoto');
    const telegramInstance = this.telegramService.getTelegramClient(
      client.data.session,
    );

    const buffer = Buffer.from(payload.fileBuffer, 'base64'); // Предполагается, что fileBuffer закодирован в base64
    const filePath = 'photo.png';

    // Сохраняем аудиофайл временно на диск
    fs.writeFileSync(filePath, buffer);

    console.log('filePath', filePath);
    console.log('payload', payload.userId);
    const result = await telegramInstance.sendFile(payload.userId, {
      file: filePath,
      // photo: true,
      message: payload.caption,
    });
    console.log('result', result);

    // client.emit('sendAudio', { status: 'success', data: result });
    fs.unlinkSync(filePath); // Удаление временного файла после отправки
  }
}
