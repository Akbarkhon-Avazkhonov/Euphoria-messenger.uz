import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { telegramClient } from 'src/telegramClient';
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

  async handleConnection(client: Socket) {
    try {
      const session = client.handshake.headers.session;
      if (!session) {
        throw new Error('Session header is missing');
      }

      setInterval(async () => {
        const tg = await telegramClient(session);
        tg.addEventHandler(
          (event: NewMessageEvent) => eventPrint(event, client),
          new NewMessage({}),
        );
        console.log('Event handler added');
      }, 10000);
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
        const tg = await telegramClient(session);
        tg.removeEventHandler(eventPrint, new NewMessage({}));
      }
      console.log(`Client disconnected: ${client.id}`);
    } catch (error) {
      console.error(`Disconnection error: ${error.message}`);
    }
  }
}

async function eventPrint(event: NewMessageEvent, client: any) {
  try {
    const message = event.message;
    if (event.isPrivate) {
      console.log(`Received message: ${message.text}`);
      client.emit('message', message);
    }
  } catch (error) {
    console.error(`Event print error: ${error.message}`);
  }
}
