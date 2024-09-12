import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import * as fs from 'fs';
import { telegramClient } from 'src/telegramClient';
import { Api } from 'telegram';
import { generateRandomBytes, readBigIntFromBuffer } from 'telegram/Helpers';
import { CustomFile } from 'telegram/client/uploads';
import { NewMessage, NewMessageEvent } from 'telegram/events';

import { blobToBuffer, splitSession } from './chat.utils';
import { SessionGuard } from './sessuon.guard';
import { UseGuards } from '@nestjs/common';
import { UserIdGuard } from './userId.guard';

@UseGuards(SessionGuard)
@WebSocketGateway({
  cors: {
    origin: ['https://euphoria-messenger.uz', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
    cookie: true,
    maxHttpBufferSize: 1e8,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private tgs: any[] = [];
  async handleConnection(client: Socket) {
    const cookie = client.handshake.headers.cookie;
    if (cookie) {
      const session = splitSession(cookie);
      this.tgs[session] = await telegramClient(session);
      this.tgs[session].addEventHandler(
        (event: NewMessageEvent) => eventPrint(event, client, session),
        new NewMessage({}),
      );
      client.join(session);
      client.to(session).emit('connection', 'Connected to Telegram');
      client.emit('connection', 'Connected to Telegram');
      const dialogs = await this.tgs[session].getDialogs({ limit: 100 });
      const result = dialogs.map(
        (dialog) =>
          dialog.isUser && {
            userId: dialog.id,
            title: dialog.title,
            unreadCount: dialog.unreadCount,
            phone: dialog.entity.phone,
            message: dialog.message.message,
            date: dialog.date,
          },
      );
      client.emit('dialogs', result);
    } else {
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const session = client.handshake.headers.session;
      if (typeof session == 'string' && this.tgs[session]) {
        this.tgs[session].removeEventHandler(eventPrint, new NewMessage({}));
      }
      console.log(`Client disconnected: ${client.id}`);
    } catch (error) {
      console.error(`Disconnection error: ${error.message}`);
    }
  }

  @SubscribeMessage('getDialogs')
  async handleDialogs(client: Socket) {
    const dialogs = await this.tgs[client.data.session].getDialogs({
      limit: 100,
    });
    const result = dialogs.map(
      (dialog) =>
        dialog.isUser && {
          userId: dialog.id,
          title: dialog.title,
          unreadCount: dialog.unreadCount,
          phone: dialog.entity.phone,
          message: dialog.message.message,
          date: dialog.date,
        },
    );
    client.emit('dialogs', result);
  }

  @UseGuards(UserIdGuard)
  @SubscribeMessage('getMessages')
  async handleGetMessages(client: Socket, payload: any) {
    if (client.data.session && payload[0].userId) {
      const messages = await this.tgs[client.data.session].getMessages(
        payload[0].userId,
        {
          limit: 10,
        },
      );
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
      result.forEach(async (message) => {
        message.mediaObject = messages.find((m) => m.id === message.id).media;
        if (message.mediaObject) {
          if (message.mediaObject.document) {
            const fileName =
              message.mediaObject.document.attributes[
                message.mediaObject.document.attributes.length - 1
              ].fileName;
            const isExist = fs.existsSync(`./uploads/${fileName}`);
            if (!isExist) {
              const file = await this.tgs[client.data.session].downloadMedia(
                message.mediaObject,
                {
                  workers: 1,
                },
              );
              fs.writeFileSync(`./uploads/${fileName}`, file);
            }
          }
          delete message.mediaObject;
        }
      });
    }
  }

  @UseGuards(UserIdGuard)
  @SubscribeMessage('getFile')
  async handleGetFile(client: Socket, payload: any): Promise<void> {
    if (client.data.session && payload.userId) {
      // await this.tgs[session].getDialogs({ limit: 100 });
      const result = await this.tgs[client.data.session].getMessages(
        payload.userId,
        {
          ids: [payload.messageId],
        },
      );
      console.log('Get file:', result);

      // find if exist in uploads
      const isExist = fs.existsSync(
        `./uploads/${result[0].media.document.attributes[result[0].media.document.attributes.length - 1].fileName}`,
      );
      if (isExist) {
        client.emit(
          'getFile',
          `${process.env.BACKEND_URL}/uploads/${result[0].media.document.attributes[result[0].media.document.attributes.length - 1].fileName}`,
        );
        return;
      }
      const file = await this.tgs[client.data.session].downloadMedia(
        result[0].media,
        {
          workers: 1,
        },
      );

      const fileName =
        result[0].media.document.attributes[
          result[0].media.document.attributes.length - 1
        ].fileName;
      fs.writeFileSync(`./uploads/${fileName}`, file);

      client.emit('getFile', `${process.env.BACKEND_URL}/uploads/${fileName}`);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<string> {
    try {
      const id = payload.userId;
      const message = payload.message;
      await this.tgs[client.data.session].getDialogs();
      const result = await this.tgs[client.data.session].sendMessage(
        id.toString(),
        {
          message: message,
        },
      );
      return result;
    } catch (error) {
      console.error(`Error sending message: ${error.message}`);
    }
  }

  @SubscribeMessage('sendFirstMessage')
  async handleSendFirstMessage(client: Socket, payload: any): Promise<string> {
    try {
      const phone = payload.phone;
      const firstName = payload.firstName;
      const message = payload.message;
      await this.tgs[client.data.session].invoke(
        new Api.contacts.ImportContacts({
          contacts: [
            new Api.InputPhoneContact({
              clientId: readBigIntFromBuffer(generateRandomBytes(8)),
              phone: phone,
              firstName: firstName,
              lastName: '',
            }),
          ],
        }),
      );
      const userPeer = await this.tgs[client.data.session].getEntity(phone);
      const user = await this.tgs[client.data.session].sendMessage(userPeer, {
        message: message,
      });
      return user;
    } catch (error) {
      console.error(`Error sending first message: ${error.message}`);
    }
  }

  @SubscribeMessage('sendFile')
  async handleSendFile(client: Socket, payload: any): Promise<string> {
    try {
      const id = payload.userId;
      const fileBuffer = payload.fileBuffer;
      const buffer = Buffer.from(fileBuffer);
      const message = payload.message;
      await this.tgs[client.data.session].getDialogs('limit: 100');
      const customFile = new CustomFile(
        payload.fileName,
        buffer.length,
        payload.fileName,
        buffer,
      );

      const result = await this.tgs[client.data.session].sendFile(id, {
        file: customFile,
        message: message,
        fileName: payload.fileName,
        forceDocument: true,
      });

      return result;
    } catch (error) {
      console.error(`Error sending file: ${error.message}`);
    }
  }

  @SubscribeMessage('sendAudio')
  async handleAudio(client: Socket, payload: any) {
    try {
      const { userId, blob, caption, duration } = payload;

      const buffer: any = await blobToBuffer(blob);

      // Save the buffer to a temporary file (GramJS works with file paths)
      fs.writeFileSync('audio.ogg', buffer);

      // Send audio file to a specific chat (e.g., by chat ID or username)
      await this.tgs[client.data.session].sendFile(userId, {
        file: 'audio.ogg',
        voiceNote: true,
        message: caption,
        fileName: payload.fileName,
        attributes: [
          new Api.DocumentAttributeAudio({
            voice: true,
            duration: duration,
            waveform: buffer, // Optional waveform
          }),
        ],
      });

      console.log('Audio file sent successfully!');
    } catch (error) {
      console.error(`Error sending audio file: ${error.message}`);
    }
  }
}

async function eventPrint(event: NewMessageEvent, client: any, session: any) {
  try {
    if (event.isPrivate) {
      client.to(session).emit('newMessage', event.message);
      client.emit('newMessage', event.message);
    }
  } catch (error) {
    console.error(`Event print error: ${error.message}`);
  }
}
