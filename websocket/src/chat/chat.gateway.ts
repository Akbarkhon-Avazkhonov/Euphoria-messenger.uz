import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { telegramClient } from 'src/telegramClient';
import { Api } from 'telegram';
import { generateRandomBytes, readBigIntFromBuffer } from 'telegram/Helpers';
import { NewMessage, NewMessageEvent } from 'telegram/events';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['session'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private connectedUsers: Map<string, { socket: Socket; userId: number }> =
    new Map();
  private tg: any;
  async handleConnection(client: Socket) {
    try {
      const session = client.handshake.headers.session;
      if (!session) {
        throw new Error('Session header is missing');
      }
      this.tg = await telegramClient(session);
      const dialogs = await this.tg.getDialogs({ limit: 100 });
      const result = dialogs.map(
        (dialog) =>
          dialog.isUser && {
            userId: dialog.id,
            title: dialog.title,
            unreadCount: dialog.unreadCount,
            message: dialog.message.message,
            date: dialog.date,
          },
      );
      const filteredResult = result.filter((item) => item);
      client.emit('message', filteredResult);

      // setInterval(async () => {

      this.tg.addEventHandler(
        (event: NewMessageEvent) => eventPrint(event, client),
        new NewMessage({}),
      );
      console.log('Event handler added');
      // }, 10000);
      console.log(`Client connected: ${client.id}`);
    } catch (error) {
      console.error(`Connection error: ${error.message}`);
      client.disconnect(true); // disconnect the client if an error occurs
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const session = client.handshake.headers.session;
      if (session) {
        this.tg.removeEventHandler(eventPrint, new NewMessage({}));
      }
      console.log(`Client disconnected: ${client.id}`);
    } catch (error) {
      console.error(`Disconnection error: ${error.message}`);
    }
  }
  @SubscribeMessage('message')
  async handleMessage(client: Socket): Promise<string> {
    const session = client.handshake.headers.session;
    console.log('Session:', session);
    if (!session) {
      return 'Session header is missing';
    } else {
      const dialogs = await this.tg.getDialogs({ limit: 100 });
      const result = dialogs.map(
        (dialog) =>
          dialog.isUser && {
            userId: dialog.id,
            title: dialog.title,
            unreadCount: dialog.unreadCount,
            message: dialog.message.message,
            date: dialog.date,
          },
      );
      const filteredResult = result.filter((item) => item);
      client.emit('message', filteredResult);
    }
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(client: Socket, payload: any): Promise<string> {
    const session = client.handshake.headers.session;
    if (!session) {
      return 'Session header is missing';
    } else {
      try {
        const maxId = payload.maxId;
        const id = payload.id;
        await this.tg.getDialogs({ limit: 100 });
        const messages = await this.tg.getMessages(id.toString(), {
          limit: 100,
          maxId: maxId,
        });
        const result = messages.map((message) => ({
          id: message.id,
          out: message.out,
          fromId: message.fromId,
          toId: message.toId,
          message: message.message,
          date: message.date,
        }));
        result.sort((a, b) => a.date - b.date);
        client.emit('messages', result);
      } catch (error) {
        console.error(`Error getting messages: ${error.message}`);
      }
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<string> {
    const session = client.handshake.headers.session;
    if (!session) {
      return 'Session header is missing';
    } else {
      try {
        const id = payload.id;
        const message = payload.message;
        await this.tg.getDialogs();
        const result = await this.tg.sendMessage(id.toString(), {
          message: message,
        });
        return result;
      } catch (error) {
        console.error(`Error sending message: ${error.message}`);
      }
    }
  }

  @SubscribeMessage('sendFirstMessage')
  async handleSendFirstMessage(client: Socket, payload: any): Promise<string> {
    const session = client.handshake.headers.session;
    if (!session) {
      return 'Session header is missing';
    } else {
      try {
        const phone = payload.phone;
        const firstName = payload.firstName;
        const message = payload.message;
        await this.tg.invoke(
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
        const userPeer = await this.tg.getEntity(phone);
        const user = await this.tg.sendMessage(userPeer, {
          message: message,
        });
        // create or update user in db
        // await this.prisma.user.upsert({
        //   where: { phoneNumber: phone },
        //   update: { phoneNumber: phone, name: firstName },
        //   create: { phoneNumber: phone, name: firstName, role_id: 3, telegram_id: userPeer.id.toString() },
        // });
        return user;
      } catch (error) {
        console.error(`Error sending first message: ${error.message}`);
      }
    }
  }
}

async function eventPrint(event: NewMessageEvent, client: any) {
  try {
    const message = event.message;
    if (event.isPrivate) {
      console.log(`Received message: ${message.text}`);
      client.emit('newMessage', message);
    }
  } catch (error) {
    console.error(`Event print error: ${error.message}`);
  }
}
