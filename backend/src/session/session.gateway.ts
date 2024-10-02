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
import { instrument } from '@socket.io/admin-ui';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'], // Allow multiple transports
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
    private readonly telegramService: TelegramService,
  ) {}

  afterInit() {
    instrument(this.server, {
      auth: false,
      mode: 'development',
    });
  }
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

    // Add client to the session room and set the session data
    client.join(session);
    await redisClient.sAdd(`session:clients:${session}`, client.id);
    await redisClient.set(`client:session:${client.id}`, session);

    // Initialize Telegram client for the session if it doesn't exist
    let telegramInstance = this.telegramService.getTelegramClient(session);
    if (!telegramInstance) {
      telegramInstance = await telegramClient(session);
      this.telegramService.setTelegramClient(session, telegramInstance);
    }

    // Add event handler for new messages, if not already added
    if (!client.data.hasTelegramHandler) {
      console.log('Adding event handler for new messages');
      telegramInstance.addEventHandler(
        (event: NewMessageEvent) => this.handleNewMessage(event, session),
        new NewMessage({}),
      );
      client.data.hasTelegramHandler = true; // Mark the handler as attached
    }

    // Notify client of successful connection
    client.emit('connection', 'Connected to Telegram');

    // Get initial dialogs and send to the client
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

  // Handle client disconnection
  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);

    const redisClient = this.redisService.getClient();
    const session = await redisClient.get(`client:session:${client.id}`);

    if (session) {
      await redisClient.sRem(`session:clients:${session}`, client.id);
      await redisClient.del(`client:session:${client.id}`);
      client.leave(session); // Remove client from the session room

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

  // Extract session from cookie
  private async getSessionFromCookie(cookie: string): Promise<string | null> {
    if (!cookie) return null;

    const tokenCookie = cookie
      .split(';')
      .find((c) => c.trim().startsWith('token='));
    if (!tokenCookie) throw new Error('Token not found in cookies');

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

  // Handle new messages and broadcast to all clients in the session room
  private async handleNewMessage(
    event: NewMessageEvent,
    session: string,
  ): Promise<void> {
    try {
      if (event.isPrivate) {
        // Emit the new message to all clients in the session room
        this.server.to(session).emit('newMessage', event.message);
      }
    } catch (error) {
      console.error('Error handling new message event:', error);
    }
  }
}
