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
    new Map(); // Map для хранения подключенных клиентов
  async handleConnection(client: Socket) {
    const session = client.handshake.headers.session;
    const tg = await telegramClient(session);
    tg.addEventHandler(
      (event: NewMessageEvent) => eventPrint(event, client),
      new NewMessage({}),
    );
  }

  async handleDisconnect(client: Socket) {
    const session = client.handshake.headers.session;
    const tg = await telegramClient(session);
    tg.removeEventHandler(eventPrint, new NewMessage({}));
  }

  // @SubscribeMessage('message')
  // async handleMessage(
  //   @MessageBody() data: string,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   const session = client.handshake.headers.session;
  //   const tg = await telegramClient(session);
  //   //when connected user

  //   tg.addEventHandler(
  //     (event: NewMessageEvent) => eventPrint(event, client),
  //     new NewMessage({}),
  //   );
  // }
}

async function eventPrint(event: NewMessageEvent, client: any) {
  const message = event.message;
  // Checks if it's a private message (from user or bot)
  if (event.isPrivate) {
    client.emit('message', message);
  }
}
// adds an event handler for new messages
