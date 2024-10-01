import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { FileService } from './file.service';
import { SessionGuard } from 'src/session/session.guard';
import { UseGuards } from '@nestjs/common';
import { TelegramService } from 'src/telegram/telegram.service';
import { Socket } from 'socket.io';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CustomFile } from 'telegram/client/uploads';

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
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class FileGateway {
  constructor(
    private readonly fileService: FileService,
    private readonly telegramService: TelegramService,
  ) {}

  @SubscribeMessage('getFile')
  async handleGetFile(client: Socket, payload: GetFilePayload): Promise<void> {
    try {
      if (!client.data.session || !payload.userId) return;

      const telegramInstance = this.telegramService.getTelegramClient(
        client.data.session,
      );
      if (!telegramInstance) {
        client.emit('error', 'Telegram instance not found');
        return;
      }

      const result = await telegramInstance.getMessages(payload.userId, {
        ids: [payload.messageId],
      });

      const fileName = result[0]?.media?.document?.attributes?.pop()?.fileName;
      const filePath = path.join(__dirname, '..', 'uploads', fileName);

      if (fileName && (await this.fileExists(filePath))) {
        client.emit(
          'getFile',
          `${process.env.BACKEND_URL}/uploads/${fileName}`,
        );
      } else if (result[0]?.media) {
        const file = await telegramInstance.downloadMedia(result[0].media, {
          workers: 1,
        });
        if (file) {
          await fs.writeFile(filePath, file);
          client.emit(
            'getFile',
            `${process.env.BACKEND_URL}/uploads/${fileName}`,
          );
        }
      } else {
        client.emit('error', 'File not found in Telegram message');
      }
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
      if (
        !client.data.session ||
        !payload.userId ||
        !payload.fileBuffer ||
        !payload.fileName
      )
        return;

      const telegramInstance = this.telegramService.getTelegramClient(
        client.data.session,
      );
      if (!telegramInstance) {
        client.emit('error', 'Telegram instance not found');
        return;
      }

      const buffer = Buffer.from(payload.fileBuffer);
      const customFile = new CustomFile(
        payload.fileName,
        buffer.length,
        payload.fileName,
        buffer,
      );

      const result = await telegramInstance.sendFile(payload.userId, {
        file: customFile,
        message: payload.message,
        fileName: payload.fileName,
        forceDocument: true,
      });

      client.emit('sendFile', { status: 'success', data: result });
    } catch (error) {
      client.emit('error', `Failed to send file: ${error.message}`);
    }
  }

  // Helper method to check if file exists
  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
