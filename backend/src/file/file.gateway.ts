import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { FileService } from './file.service';
import { SessionGuard } from 'src/session/session.guard';
import { UseGuards } from '@nestjs/common';
import { TelegramService } from 'src/telegram/telegram.service';
import { Socket } from 'socket.io';
import * as fs from 'fs/promises'; // Используем fs.promises для асинхронных операций
import { CustomFile } from 'telegram/client/uploads';
import * as path from 'path';
import { stringify } from 'querystring';

interface GetFilePayload {
  userId: number;
  messageId: number;
}

interface SendFilePayload {
  userId: number;
  fileBuffer: string;
  fileName: string;
  message: string;
}

@UseGuards(SessionGuard)
@WebSocketGateway()
export class FileGateway {
  constructor(
    private readonly fileService: FileService,
    private readonly telegramService: TelegramService,
  ) {}

  // Асинхронная функция для проверки существования файла
  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  @SubscribeMessage('getFile')
  async handleGetFile(client: Socket, payload: GetFilePayload): Promise<void> {
    try {
      // Проверка наличия сеанса и userId в payload
      if (!client.data.session || !payload.userId) return;

      const telegramInstance = this.telegramService.getTelegramClient(
        client.data.session,
      );
      if (!telegramInstance) {
        client.emit('error', 'Telegram instance not found');
        return;
      }

      // Получение сообщения по userId и messageId
      const result = await telegramInstance.getMessages(payload.userId, {
        ids: [payload.messageId],
      });

      // Проверка, что сообщение и медиафайл существуют
      if (!result || result.length === 0 || !result[0].media) {
        client.emit('error', 'No media found in the message');
        return;
      }

      const media = result[0].media;
      // if (!media.document) {
      //   client.emit('error', 'No document found in the media');
      //   console.log('No media found in the message');

      //   return;
      // }

      const documentAttributes = media.document.attributes;
      // if (!documentAttributes || documentAttributes.length === 0) {
      //   client.emit('error', 'No document attributes found');
      //   return;
      // }

      const fileName =
        documentAttributes[documentAttributes.length - 1].fileName;
      const uploadPath = path.join(__dirname, '..', 'uploads', fileName);

      // Проверка, существует ли уже файл в директории uploads
      const isExist = await this.fileExists(uploadPath);
      if (isExist) {
        client.emit(
          'getFile',
          `${process.env.BACKEND_URL}/uploads/${fileName}`,
        );
        return;
      }

      // Загрузка медиафайла из Telegram
      const file = await telegramInstance.downloadMedia(media, { workers: 1 });
      await fs.writeFile(uploadPath, file);

      client.emit('getFile', `${process.env.BACKEND_URL}/uploads/${fileName}`);
    } catch (error) {
      client.emit('error', `Failed to get file: ${error.message}`);
    }
  }

  @SubscribeMessage('sendFile')
  async handleSendFile(
    client: Socket,
    payload: SendFilePayload,
  ): Promise<void> {
    try {
      // Проверка входных данных
      if (
        !client.data.session ||
        !payload.userId ||
        !payload.fileBuffer ||
        !payload.fileName
      )
        return;

      console.log('client.data.session', client.data.session);

      const telegramInstance = this.telegramService.getTelegramClient(
        client.data.session,
      );

      // Создание буфера из строки fileBuffer
      const buffer = Buffer.from(payload.fileBuffer, 'base64'); // Предполагается, что fileBuffer закодирован в base64
      // save file
      await fs.writeFile(
        path.join(__dirname, '../..', 'uploads', payload.fileName),
        buffer,
      );
      const pathToFile = path.join(
        __dirname,
        '../..',
        'uploads',
        payload.fileName,
      );

      // Отправка файла через Telegram
      const result = await telegramInstance.sendFile(payload.userId, {
        file: pathToFile,
        message: payload.message,
        fileName: payload.fileName,
        forceDocument: true,
      });

      client.emit('sendFile', { status: 'success', data: stringify(result) });
    } catch (error) {
      client.emit('error', `Failed to send file: ${error.message}`);
    }
  }
}
