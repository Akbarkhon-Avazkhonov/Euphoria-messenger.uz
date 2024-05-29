import { Injectable } from '@nestjs/common';
import { telegramClient } from 'src/telegramClient';
import { HttpException } from '@nestjs/common';
import { Api } from 'telegram';
import { PrismaService } from 'src/prisma.service';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import { generateRandomBytes, readBigIntFromBuffer } from 'telegram/Helpers';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getDialogs(headers: any) {
    const client = await telegramClient(headers.session);
    try {
      const dialogs = await client.getDialogs({ limit: 100 });
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
      return result.filter((item) => item);
    } catch (error) {
      console.error(`Error getting dialogs: ${error.message}`);
      throw new HttpException(error.message, error.code || 500);
    } finally {
      await client.disconnect();
    }
  }

  async getMessages(headers: any, id: number, maxId: number = 0) {
    const client = await telegramClient(headers.session);
    try {
      await client.getDialogs({ limit: 100 });
      const messages = await client.getMessages(id.toString(), {
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
      return result;
    } catch (error) {
      console.error(`Error getting messages: ${error.message}`);
      throw new HttpException(error.message, error.code || 500);
    } finally {
      await client.disconnect();
    }
  }

  async sendMessage(headers: any, id: number, message: string) {
    const client = await telegramClient(headers.session);
    try {
      await client.getDialogs();
      const result = await client.sendMessage(id.toString(), {
        message: message,
      });
      return result;
    } catch (error) {
      console.error(`Error sending message: ${error.message}`);
      throw new HttpException(error.message, error.code || 500);
    } finally {
      await client.disconnect();
    }
  }

  async sendFirstMessage(
    headers: any,
    phone: string,
    firstName: string,
    message: string,
  ) {
    const client = await telegramClient(headers.session);
    try {
      await client.invoke(
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
      const userPeer = await client.getEntity(phone);
      const user = await client.sendMessage(userPeer, {
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
      throw new HttpException(error.message, error.code || 500);
    } finally {
      await client.disconnect();
    }
  }

  async getMedia(headers: any, id: number, message_id: number, res: any) {
    const client = await telegramClient(headers.session);
    try {
      await client.getDialogs();
      const messages = await client.getMessages(id.toString(), {});
      const message = messages.find((msg) => msg.id === message_id);
      if (!message) {
        throw new HttpException('Message not found', 404);
      }
      const file = await client.downloadMedia(message);
      fs.writeFileSync('audio.ogg', file);
      res.set({ 'Content-Type': 'audio/ogg' });
      return res.send(Buffer.from(file));
    } catch (error) {
      console.error(`Error getting media: ${error.message}`);
      throw new HttpException(error.message, error.code || 500);
    } finally {
      await client.disconnect();
    }
  }
}
