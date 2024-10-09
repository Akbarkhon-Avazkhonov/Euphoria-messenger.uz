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
@WebSocketGateway()
export class MessagesGateway {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly telegramService: TelegramService, // Inject TelegramService
  ) {}
  @SubscribeMessage('getMessages')
  async handleGetMessages(client: Socket, payload: any) {
    if (client.data.session && payload[0].userId) {
      const telegramInstance = this.telegramService.getTelegramClient(
        client.data.session,
      );
      if (telegramInstance) {
        const messages = await telegramInstance.getMessages(payload[0].userId, {
          limit: 10,
        });
        const result = await Promise.all(
          messages.map(async (message) => {
            const messageData: any = {
              id: message.id,
              out: message.out,
              fromId: message.fromId,
              toId: message.toId,
              message: message.message,
              date: message.date,
              peerId: message.peerId,
              media: JSON.stringify(message.media),
            };

            // Check if the message has a photo
            if (message.photo) {
              const photoPath = `uploads/${message.photo.id}.jpg`;

              // Check if the photo file already exists
              if (!fs.existsSync(photoPath)) {
                const photoBuffer = await telegramInstance.downloadMedia(
                  message.photo,
                );

                // Save the photo to the file system
                fs.writeFileSync(photoPath, photoBuffer);
              }

              // Add the photo URL to the message data
              messageData.photoUrl = photoPath;
              messageData.media = true; // Indicate that this message contains media
              console.log('photoUrl', messageData.photoUrl);
              console.log('media', messageData.media);
            } else if (message.media && message.media.voice) {
              const voicePath = `uploads/${message.media.document.id}.ogg`;
              if (!fs.existsSync(voicePath)) {
                const voiceBuffer =
                  await telegramInstance.downloadMedia(message);
                fs.writeFileSync(voicePath, voiceBuffer);
              }
              messageData.voiceUrl = voicePath;
              messageData.media = true;
            }
            return messageData; // Return the constructed message data
          }),
        );

        result.sort((a, b) => a.date - b.date);

        client.emit('getMessages', result);
        // Additional file handling logic...
      }
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    try {
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
