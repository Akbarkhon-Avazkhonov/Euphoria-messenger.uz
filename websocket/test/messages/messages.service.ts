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
  async getDialogs(headers: any, webhook: string = process.env.TEST_WEBHOOK) {
    const client = await telegramClient(headers.session);
    try {
      const dialogs = await client.getDialogs();

      client.addEventHandler((update: Api.UpdateShortMessage) => {
        if (update.className === 'UpdateShortMessage') {
          this.httpService.post(webhook, update).subscribe({
            complete: async () => {
              await this.prisma.message.create({
                data: {
                  out: update.out,
                  message_id: update.id,
                  client_id: update.userId.toString(),
                  message: update.message,
                  date: update.date.toString(),
                  // ignore the error
                  operator_id: '0', // Add the missing property
                  other: null, // Add the missing property
                },
              });
            },
            error: (err) => {
              console.log('Error: ' + err);
            },
          });
        }
      });
      const result = dialogs.map((dialog) => ({
        userId: dialog.id,
        title: dialog.title,
        unreadCount: dialog.unreadCount,
        message: dialog.message.message,
        date: dialog.date,
      }));
      client.disconnect();
      client.destroy();
      return result;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
  async getMessages(headers: any, id: number, maxId: number = 0) {
    const client = await telegramClient(headers.session);
    try {
      await client.getDialogs({ limit: 100 });
      const messages = await client.getMessages(id.toString(), {
        limit: 20,
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
      client.disconnect();
      return result;
    } catch (error) {
      throw new HttpException(error.errorMessage, error.code || 500);
    }
  }
  async sendMessage(headers: any, id: number, message: string) {
    const client = await telegramClient(headers.session);
    try {
      // make here code that will get entity from bd using id
      await client.getDialogs();
      const result = await client.sendMessage(id.toString(), {
        message: message,
      });
      client.disconnect();
      return result;
    } catch (error) {
      client.disconnect();
      throw new HttpException(error.errorMessage, error.code || 500);
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
      client.disconnect();
      // create user or update user in db
      await this.prisma.user.upsert({
        where: { phoneNumber: phone },
        update: {
          phoneNumber: phone,
          name: firstName,
        },
        create: {
          phoneNumber: phone,
          name: firstName,
          role_id: 3,
          telegram_id: userPeer.id.toString(),
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      client.disconnect();
      throw new HttpException(error.errorMessage, error.code || 500);
    }
  }
  async getMedia(headers: any, id: number, message_id: number, res: any) {
    const client = await telegramClient(headers.session);
    try {
      //dialog need to show peer id to the library
      await client.getDialogs();
      const messages = await client.getMessages(id.toString(), {});
      // make me simple function find message from messages where id = id
      const message = messages.find((message) => message.id === message_id);
      const file = await client.downloadMedia(message);
      await client.disconnect();
      // save file in local
      fs.writeFileSync('audio.ogg', file);
      const result = Buffer.from(file);
      res.set({ 'Content-Type': 'audio/ogg' });
      return res.send(result);
    } catch (error) {
      await client.disconnect();
      throw new HttpException(error.errorMessage, error.code || 500);
    }
  }
}
