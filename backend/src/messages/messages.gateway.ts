import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { SessionGuard } from 'src/session/session.guard';
import { UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';
import { TelegramService } from 'src/telegram/telegram.service';
import * as fs from 'fs';
import { generateRandomBytes, readBigIntFromBuffer } from 'telegram/Helpers';
import { Api } from 'telegram';

@UseGuards(SessionGuard)
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class MessagesGateway {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly telegramService: TelegramService, // Inject TelegramService
  ) {}
  @SubscribeMessage('getMessages')
  async handleGetMessages(client: Socket, payload: any) {
    console.log('getMessages', payload);
    if (client.data.session && payload[0].userId) {
      const telegramInstance = this.telegramService.getTelegramClient(
        client.data.session,
      );
      if (telegramInstance) {
        const messages = await telegramInstance.getMessages(payload[0].userId, {
          limit: 10,
        });
        fs.writeFileSync('round.json', JSON.stringify(messages[0]));
        const result = messages.map((message) => ({
          id: message.id,
          out: message.out,
          fromId: message.fromId,
          toId: message.toId,
          message: message.message,
          date: message.date,
          peerId: message.peerId,
          media: JSON.stringify(message.media),
        }));
        result.sort((a, b) => a.date - b.date);

        client.emit('getMessages', result);
        // Additional file handling logic...
      }
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    try {
      console.log('sendMessage payload:', payload);

      if (client.data.session && payload?.userId && payload?.message) {
        // Получение экземпляра Telegram-клиента
        const telegramInstance = this.telegramService.getTelegramClient(
          client.data.session,
        );

        if (telegramInstance) {
          // Отправка сообщения пользователю с указанным userId
          const result = await telegramInstance.sendMessage(
            payload.userId.toString(),
            {
              message: payload.message,
            },
          );

          // Запись результата в файл (опционально, для отладки)
          fs.writeFileSync('sendMessageResult.json', JSON.stringify(result));

          // Эмит сообщения обратно клиенту с подтверждением успешной отправки
          client.emit('sendMessage', { status: 'success', data: result });
          console.log(`Message sent successfully to user: ${payload.userId}`);
        } else {
          client.emit('sendMessage', {
            status: 'error',
            message: 'Telegram instance not found',
          });
          console.error('Telegram instance not found');
        }
      } else {
        client.emit('sendMessage', {
          status: 'error',
          message: 'Invalid payload or session',
        });
        console.error('Invalid payload or session');
      }
    } catch (error) {
      client.emit('sendMessage', { status: 'error', message: error.message });
      console.error(`Error sending message: ${error.message}`);
    }
  }
  // Отправка первого сообщения после добавления в контакты
  @SubscribeMessage('sendFirstMessage')
  async handleSendFirstMessage(client: Socket, payload: any): Promise<void> {
    if (
      !client.data.session ||
      !payload.phone ||
      !payload.firstName ||
      !payload.message
    )
      return;

    const telegramInstance = this.telegramService.getTelegramClient(
      client.data.session,
    );
    if (!telegramInstance) {
      client.emit('error', 'Telegram instance not found');
      return;
    }

    try {
      await telegramInstance.invoke(
        new Api.contacts.ImportContacts({
          contacts: [
            new Api.InputPhoneContact({
              clientId: readBigIntFromBuffer(generateRandomBytes(8)),
              phone: payload.phone,
              firstName: payload.firstName,
              lastName: '',
            }),
          ],
        }),
      );
      const userPeer = await telegramInstance.getEntity(payload.phone);
      const result = await telegramInstance.sendMessage(userPeer, {
        message: payload.message,
      });
      client.emit('sendFirstMessage', { status: 'success', data: result });
    } catch (error) {
      client.emit('error', {
        message: `Error sending first message: ${error.message}`,
      });
    }
  }
}
