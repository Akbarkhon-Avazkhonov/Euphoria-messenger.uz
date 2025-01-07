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
import { stringify as flattedStringify, parse } from 'flatted'; // Используем для безопасной сериализации

import * as fs from 'fs';
import { PgService } from 'src/other/pg.service';

@Injectable()
@WebSocketGateway()
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
    private readonly pgService: PgService,
  ) {}

  afterInit() {
    // this.server.setMaxListeners(12);
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

    client.on('disconnect', async () => await this.handleDisconnect(client));
    // Add client to the session room and set the session data
    client.join(session);
    await redisClient.sAdd(`session:clients:${session}`, client.id);
    await redisClient.set(`client:session:${client.id}`, session);

    // Initialize Telegram client for the session if it doesn't exist
    let telegramInstance = this.telegramService.getTelegramClient(session);
    if (!telegramInstance) {
      telegramInstance = await telegramClient(session);
      this.telegramService.setTelegramClient(session, telegramInstance);
      // Remove previous handlers if they exist
      telegramInstance.removeEventHandler(this.handleNewMessage);
      telegramInstance.addEventHandler(
        (event: NewMessageEvent) =>
          this.handleNewMessage(event, session, telegramInstance),
        new NewMessage({}),
      );
    }

    // Notify client of successful connection
    client.emit('connection', 'Connected to Telegram');

    // Get initial dialogs and send to the client
    const dialogs = await telegramInstance.getDialogs({ limit: 100 });
    const result = dialogs
      .filter((dialog) => dialog.isUser)
      .map((dialog) => ({
        userId: dialog.id,
        title: dialog.title,
        unreadCount: dialog.unreadCount,
        phone: dialog.entity?.phone,
        message: dialog.message?.message,
        date: dialog.message?.date,
        status: dialog.entity?.status,
        type: 'dialog', // Указываем тип объекта
      }));

    const cookieString = client.handshake.headers.cookie;

    // Функция для извлечения значения конкретного ключа из строки куки
    function getCookieValue(cookieString, key) {
      const match = cookieString.match(new RegExp(`${key}=([^;]+)`));
      return match ? match[1] : null;
    }

    // Извлечение значения 'id'
    const id = getCookieValue(cookieString, 'id');
    console.log(id); // Выводит: 6

    // Получение групп для пользователя
    const groupsQuery = await this.pgService.query(
      `SELECT g.*, g.id AS "userId"
     FROM "Groups" g
     JOIN "GroupsUsers" gu ON g.id = gu.group_id
     WHERE gu.user_id = $1`,
      [id],
    );

    const groups = groupsQuery.rows.map((group) => ({
      ...group,
      type: 'group', // Указываем тип объекта
    }));
    console.log(groups); // Логируем группы

    // Объединяем dialogs и groups в один список
    const finalResult = [...groups, ...result];

    console.log(finalResult); // Финальный результат

    client.emit('dialogs', finalResult);
  }

  // Handle client disconnection
  async handleDisconnect(client: Socket) {
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
      }
    }
  }

  // Extract session from cookie
  private async getSessionFromCookie(cookie: string): Promise<string | null> {
    if (!cookie) return null;

    const tokenCookie = cookie
      .split(';')
      .find((c) => c.trim().startsWith('session='));
    if (!tokenCookie) return null;

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
    telegramInstance: any,
  ): Promise<void> {
    try {
      if (event.isPrivate) {
        // Безопасная сериализация сообщения
        const safeMessage = flattedStringify(event.message);

        if (event.message.photo) {
          const photoBuffer = await telegramInstance.downloadMedia(
            event.message.photo,
          );
          fs.writeFileSync(
            `uploads/${event.message.photo.id}.jpg`,
            photoBuffer,
          );
          const newMessage = parse(safeMessage);
          newMessage.photoUrl = `${event.message.photo.id}.jpg`;
          newMessage.media = true;
          this.server
            .to(session)
            .emit('newMessage', flattedStringify(newMessage));

          // if (photoPath) {
          //   // Отправка фото во все клиенты в комнате сессии
          //   this.server.to(session).emit('newMessage', {
          //     ...event.message,
          //     photo: photoPath,
          //   });
          // }
        } else if (event.message.voice) {
          const voiceBuffer = await telegramInstance.downloadMedia(
            event.message.voice,
          );

          console.log('Voice message received:', event.message.voice);
          fs.writeFileSync(
            `uploads/${event.message.document.id}.ogg`,
            voiceBuffer,
          );
          const newMessage = parse(safeMessage);
          newMessage.voiceUrl = `${event.message.document.id}.ogg`;
          newMessage.media = true;
          this.server
            .to(session)
            .emit('newMessage', flattedStringify(newMessage));
        }
        // Emit the new message to all clients in the session room
        this.server
          .to(session)
          .emit('newMessage', flattedStringify(event.message));
      }
    } catch (error) {
      console.error('Error handling new message event:', error);
    }
  }
}
