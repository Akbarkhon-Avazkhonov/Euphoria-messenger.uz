import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { UseGuards, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SessionService } from './session.service';
import { SessionGuard } from './session.guard';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';
import { telegramClient } from 'src/other/telegramClient';
import { NewMessage, NewMessageEvent } from 'telegram/events';
import { TelegramService } from '../telegram/telegram.service'; // Import TelegramService

@Injectable()
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
@UseGuards(SessionGuard)
export class SessionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly telegramService: TelegramService, // Inject TelegramService
  ) {}

  // Handle new client connections
  async handleConnection(client: Socket) {
    const session = await this.getSessionFromCookie(
      client.handshake.headers.cookie,
    );
    if (!session) {
      client.disconnect();
      return;
    }

    const redisClient = this.redisService.getClient();
    await redisClient.sAdd(`session:clients:${session}`, client.id);
    await redisClient.set(`client:session:${client.id}`, session);

    let telegramInstance = this.telegramService.getTelegramClient(session);
    if (!telegramInstance) {
      telegramInstance = await telegramClient(session);
      this.telegramService.setTelegramClient(session, telegramInstance);
    }

    telegramInstance.addEventHandler(
      (event: NewMessageEvent) =>
        eventPrint(event, client, session, this.redisService),
      new NewMessage({}),
    );

    client.join(session);
    client.to(session).emit('connection', 'Connected to Telegram');
    client.emit('connection', 'Connected to Telegram');

    const dialogs = await telegramInstance.getDialogs({ limit: 100 });
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
    console.log('Client connected:', session);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    const redisClient = this.redisService.getClient();
    const session = await redisClient.get(`client:session:${client.id}`);

    if (session) {
      await redisClient.sRem(`session:clients:${session}`, client.id);
      await redisClient.del(`client:session:${client.id}`);

      const clientsInSession = await redisClient.sCard(
        `session:clients:${session}`,
      );
      if (clientsInSession === 0) {
        this.telegramService.deleteTelegramClient(session);
        await redisClient.del(`session:clients:${session}`);
        console.log(`Session ${session} has no more clients. Cleaning up...`);
      }
    }
  }
  private async getSessionFromCookie(cookie: string): Promise<string | null> {
    if (!cookie) {
      return null;
    }
    const tokenCookie = cookie
      .split(';')
      .find((c) => c.trim().startsWith('token='));
    if (!tokenCookie) {
      throw new Error('Token not found in cookies');
    }
    const token = tokenCookie.split('=')[1];
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload.session;
    } catch (err) {
      console.error('JWT verification failed:', err);
      return null;
    }
  }
}

async function eventPrint(
  event: NewMessageEvent,
  client: Socket,
  session: string,
  redisService: RedisService, // Accept redisService as a parameter
) {
  try {
    if (event.isPrivate) {
      const redisClient = redisService.getClient();

      // Get all clients in the session room
      const clientsInSession = await redisClient.sMembers(
        `session:clients:${session}`,
      );

      // Emit the new message to all clients in the session
      clientsInSession.forEach((clientId) => {
        if (clientId !== client.id) {
          // Prevent sending the message back to the same client
          client.to(clientId).emit('newMessage', event.message);
        }
      });
    }
  } catch (error) {
    console.error('Error handling event:', error);
  }
}
