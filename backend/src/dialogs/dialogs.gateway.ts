import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { DialogsService } from './dialogs.service';
import { Socket } from 'socket.io';
import { TelegramService } from 'src/telegram/telegram.service';
import { SessionGuard } from 'src/session/session.guard';
import { UseGuards } from '@nestjs/common';

interface Dialog {
  userId: number;
  title: string;
  unreadCount: number;
  phone: string;
  message: string;
  date: Date;
}

@UseGuards(SessionGuard)
@WebSocketGateway()
export class DialogsGateway {
  constructor(
    private readonly dialogsService: DialogsService,
    private readonly telegramService: TelegramService,
  ) {}

  @SubscribeMessage('getDialogs')
  async handleDialogs(client: Socket): Promise<void> {
    try {
      if (!client.data.session) {
        client.emit('error', 'Session not found');
        return;
      }

      // Get the Telegram client using the session from the client data
      const telegramInstance = this.telegramService.getTelegramClient(
        client.data.session,
      );
      if (!telegramInstance) {
        client.emit('error', 'Telegram instance not found');
        return;
      }

      // Fetch dialogs using the Telegram client
      const dialogs = await telegramInstance.getDialogs({ limit: 100 });

      // Map dialogs to a cleaner format
      const result: Dialog[] = dialogs
        .filter((dialog) => dialog.isUser)
        .map((dialog) => ({
          userId: dialog.id,
          title: dialog.title,
          unreadCount: dialog.unreadCount,
          phone: dialog.entity?.phone || '',
          message: dialog.message?.message || '',
          date: dialog.date,
        }));

      // Emit the formatted dialogs to the client
      client.emit('dialogs', result);
    } catch (error) {
      // Emit an error message to the client if any issues occur
      client.emit('error', `Failed to get dialogs: ${error.message}`);
    }
  }
}
