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
import ffmpeg from 'fluent-ffmpeg';

function splitSession(cookie: string) {
  const sessionValue = cookie
    .split(';')
    .find((part) => part.trim().startsWith('session='))
    .split('=')[1];

  // Decode the session value twice
  const session = decodeURIComponent(decodeURIComponent(sessionValue));
  return session;
}

// Convert blob (either base64, ArrayBuffer, or Buffer) to a Node.js Buffer
function blobToBuffer(blob) {
  return new Promise((resolve, reject) => {
    if (blob instanceof Buffer) {
      // Already a Buffer
      resolve(blob);
    } else if (blob instanceof ArrayBuffer) {
      // Convert ArrayBuffer to Buffer
      resolve(Buffer.from(blob));
    } else if (typeof blob === 'string') {
      // Assume base64-encoded string
      const base64Data = blob.replace(/^data:audio\/ogg;base64,/, '');
      resolve(Buffer.from(base64Data, 'base64'));
    } else {
      reject(new Error('Unsupported blob type'));
    }
  });
}

async function getAudioDuration(buffer: Buffer): Promise<number> {
  return new Promise((resolve, reject) => {
    const tempFile = 'temp_audio.ogg';

    // Write the buffer to a temporary file for ffmpeg to analyze
    fs.writeFileSync(tempFile, buffer);

    // Use ffmpeg to get the audio duration
    ffmpeg.ffprobe(tempFile, (err, metadata) => {
      // Delete the temporary file after getting the metadata
      fs.unlinkSync(tempFile);

      if (err) {
        reject(err);
      } else {
        const duration = Math.ceil(metadata.format.duration); // Duration in seconds
        resolve(duration);
      }
    });
  });
}

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
  private tg: any;
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
  async handleMessage(client: Socket): Promise<string> {
    const cookie = client.handshake.headers.cookie;

    const session = splitSession(cookie);
    if (!session) {
      return 'Session header is missing';
    } else {
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
    }
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(client: Socket, payload: any): Promise<void> {
    const cookie = client.handshake.headers.cookie;

    const session = splitSession(cookie);

    if (session && payload[0].userId) {
      // await this.tgs[session].getDialogs({ limit: 100 });
      const messages = await this.tgs[session].getMessages(payload[0].userId, {
        limit: 1,
        maxId: payload.maxId,
      });
      const result = messages.map((message) => ({
        id: message.id,
        out: message.out,
        fromId: message.fromId,
        toId: message.toId,
        message: message.message,
        date: message.date,
        peerId: message.peerId,
        media: JSON.stringify(message.media),
        // fileName: message.media.document.attributes[1].fileName,
        // media: JSON.str`ingify(message.media),
      }));

      // const file = await this.tgs[session].downloadMedia(result[0].mediaObj, {
      //   workers: 1,
      // });

      // const fileName =
      //   result[0].mediaObj.document.attributes[
      //     result[0].mediaObj.document.attributes.length - 1
      //   ].fileName;
      // console.log(
      //   result[0].mediaObj.document.attributes[
      //     result[0].mediaObj.document.attributes.length - 1
      //   ].fileName,
      // );
      // fs.writeFileSync(`./uploads/${fileName}`, file);
      // console.log('Downloaded file:', file);
      // // delete mediaObj from result
      // result.forEach((element) => {
      //   delete element.mediaObj;
      // });
      result.sort((a, b) => a.date - b.date);
      client.emit('getMessages', result);
    }
  }

  @SubscribeMessage('getFile')
  async handleGetFile(client: Socket, payload: any): Promise<void> {
    const cookie = client.handshake.headers.cookie;
    const session = splitSession(cookie);

    if (session && payload.userId) {
      // await this.tgs[session].getDialogs({ limit: 100 });
      const result = await this.tgs[session].getMessages(payload.userId, {
        ids: [payload.messageId],
      });
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
      const file = await this.tgs[session].downloadMedia(result[0].media, {
        workers: 1,
      });

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
    const cookie = client.handshake.headers.cookie;

    const session = splitSession(cookie);

    if (!session) {
      return 'Session header is missing';
    } else {
      try {
        const id = payload.userId;
        const message = payload.message;
        await this.tgs[session].getDialogs();
        const result = await this.tgs[session].sendMessage(id.toString(), {
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
    const cookie = client.handshake.headers.cookie;

    const session = splitSession(cookie);
    if (!session) {
      return 'Session header is missing';
    } else {
      try {
        const phone = payload.phone;
        const firstName = payload.firstName;
        const message = payload.message;
        await this.tgs[session].invoke(
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
        const userPeer = await this.tgs[session].getEntity(phone);
        const user = await this.tgs[session].sendMessage(userPeer, {
          message: message,
        });
        return user;
      } catch (error) {
        console.error(`Error sending first message: ${error.message}`);
      }
    }
  }

  @SubscribeMessage('sendFile')
  async handleSendFile(client: Socket, payload: any): Promise<string> {
    const cookie = client.handshake.headers.cookie;

    const session = splitSession(cookie);
    if (!session) {
      return 'Session header is missing';
    } else {
      try {
        const id = payload.userId;
        const fileBuffer = payload.fileBuffer;
        const buffer = Buffer.from(fileBuffer);

        //   socket.emit('sendFile', {
        //     userId:props.userId,
        //     file:file,
        //     fileName:file.name,
        //     fileType:file.type,
        //     fileBuffer:reader.result

        // });

        const message = payload.message;
        await this.tgs[session].getDialogs('limit: 100');
        const customFile = new CustomFile(
          payload.fileName,
          buffer.length,
          payload.fileName,
          buffer,
        );

        const result = await this.tgs[session].sendFile(id, {
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
  }

  @SubscribeMessage('sendAudio')
  async handleAudio(client: Socket, payload: any): Promise<string> {
    try {
      const cookie = client.handshake.headers.cookie;

      const session = splitSession(cookie);
      if (!session) {
        return 'Session header is missing';
      }

      const { userId, blob, caption } = payload;

      const buffer: any = await blobToBuffer(blob);

      // Save the buffer to a temporary file (GramJS works with file paths)
      fs.writeFileSync('audio.ogg', buffer);

      const audio = new CustomFile(
        'audio.ogg',
        buffer.length,
        'audio.ogg',
        buffer,
      );

      // Send audio file to a specific chat (e.g., by chat ID or username)
      await this.tgs[session].sendFile(userId, {
        file: 'audio.ogg',
        caption: caption,
        attributes: [
          new Api.DocumentAttributeAudio({
            voice: true,
            duration: await getAudioDuration(buffer),
          }),
        ], // For voice messages
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
