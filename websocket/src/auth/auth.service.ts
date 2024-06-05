import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { telegramClient } from 'src/telegramClient';

import { Api } from 'telegram';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // function to create random token
  async createToken() {
    const token = Math.random().toString(36).substr(2, 9);
    return token;
  }

  async createAdmin(username: string, password: string) {
    const admin = await this.prisma.user.create({
      data: {
        username: username,
        password: password,
        phoneNumber: null,
        session: await this.createToken(),
      },
    });
    return { session: admin.session };
  }

  async sendCode(username: string, password: string, phoneNumber: string) {
    const client = await telegramClient('');
    if (
      await this.prisma.user.findUnique({ where: { phoneNumber: phoneNumber } })
    ) {
      throw new HttpException(
        'PHONE_NUMBER_ALREADY_EXISTS',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const { phoneCodeHash } = await client.sendCode(
        {
          apiId: +process.env.API_ID,
          apiHash: process.env.API_HASH,
        },
        phoneNumber,
      );
      const session = client.session.save();
      console.log('phoneCodeHash', phoneCodeHash);
      console.log('session', session);
      await this.prisma.user.create({
        data: {
          username: username,
          password: password,
          phoneNumber: phoneNumber,
        },
      });
      await client.disconnect();
      return { phoneCodeHash: phoneCodeHash, session: session };
    } catch (e) {
      console.log(e);
      throw new HttpException(e.messages, HttpStatus.BAD_REQUEST);
    }
  }
  async signInWithCode(
    phoneNumber: string,
    phoneCodeHash: string,
    phoneCode: string,
    session: string,
  ) {
    console.log('phoneNumber', phoneNumber);
    console.log('phoneCodeHash', phoneCodeHash);
    console.log('phoneCode', phoneCode);
    console.log('session', session);

    const oldSession = session;
    const client = await telegramClient(session);
    try {
      await client.invoke(
        new Api.auth.SignIn({
          phoneNumber: phoneNumber,
          phoneCodeHash: phoneCodeHash,
          phoneCode: phoneCode,
        }),
      );
      await this.prisma.user.update({
        where: {
          phoneNumber: phoneNumber,
        },
        data: {
          session: oldSession,
        },
      });
      if (client.isUserAuthorized()) {
        const session = client.session.save();
        await client.disconnect();
        return { session: session };
      } else {
        throw new HttpException('PHONE_CODE_INVALID', HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_GATEWAY);
    }
  }
  async checkUsername(headers: any, username: string) {
    const client = await telegramClient(headers.session);
    try {
      const result = await client.invoke(
        new Api.account.CheckUsername({ username }),
      );
      return result;
    } catch {
      return false;
    }
  }
  async signInWithName(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
        password: password,
      },
    });
    if (user) {
      return user;
    } else {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  async getOperators(session: string) {
    const rop = await this.prisma.user.findFirst({
      where: { session: session },
    });
    const result = [];
    if (rop) {
      const operators = await this.prisma.operator.findMany({
        where: {
          rop_id: rop.id,
        },
      });
      for (const operator of operators) {
        const oper = await this.prisma.user.findUnique({
          where: { id: operator.operator_id },
        });
        result.push(oper);
      }
      return result;
    } else {
      return result;
    }
  }
  rops: any[] = [
    {
      name: 'Steve E.',
      username: '@steveEberger',
      avatar: '/static/images/avatar/2.jpg',
      online: true,
      operators: [
        {
          name: 'Katherine Moss',
          username: '@kathy',
          avatar: '/static/images/avatar/3.jpg',
          online: false,
        },
        {
          name: 'Phoenix Baker',
          username: '@phoenix',
          avatar: '/static/images/avatar/1.jpg',
          online: true,
        },
        {
          name: 'Eleanor Pena',
          username: '@eleanor',
          avatar: '/static/images/avatar/4.jpg',
          online: false,
        },
        {
          name: 'Kenny Peterson',
          username: '@kenny',
          avatar: '/static/images/avatar/5.jpg',
          online: true,
        },
        {
          name: 'Al Sanders',
          username: '@al',
          avatar: '/static/images/avatar/6.jpg',
          online: true,
        },
        {
          name: 'Melissa Van Der Berg',
          username: '@melissa',
          avatar: '/static/images/avatar/7.jpg',
          online: false,
        },
      ],
    },
    {
      name: 'Steve E.',
      username: '@steveEberger',
      avatar: '/static/images/avatar/2.jpg',
      online: true,
      operators: [
        {
          name: 'Katherine Moss',
          username: '@kathy',
          avatar: '/static/images/avatar/3.jpg',
          online: false,
        },
        {
          name: 'Phoenix Baker',
          username: '@phoenix',
          avatar: '/static/images/avatar/1.jpg',
          online: true,
        },
        {
          name: 'Eleanor Pena',
          username: '@eleanor',
          avatar: '/static/images/avatar/4.jpg',
          online: false,
        },
        {
          name: 'Kenny Peterson',
          username: '@kenny',
          avatar: '/static/images/avatar/5.jpg',
          online: true,
        },
        {
          name: 'Al Sanders',
          username: '@al',
          avatar: '/static/images/avatar/6.jpg',
          online: true,
        },
        {
          name: 'Melissa Van Der Berg',
          username: '@melissa',
          avatar: '/static/images/avatar/7.jpg',
          online: false,
        },
      ],
    },
  ];
  async getAll(session: string) {
    const admin = await this.prisma.user.findFirst({
      where: { session: session },
    });
    if (admin) {
      const rops = this.prisma.user.findMany({
        where: { role: 'ROP' },
      });
      return rops;
    }
  }
}
