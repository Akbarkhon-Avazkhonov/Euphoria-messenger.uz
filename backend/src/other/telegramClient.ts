import { TelegramClient } from 'telegram';
import { LogLevel } from 'telegram/extensions/Logger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StringSession } from 'telegram/sessions';
const TEST_SERVERS = process.env.TEST_SERVERS == 'true';

export async function telegramClient(
  session,
  apiId = process.env.API_ID,
  apiHash = process.env.API_HASH,
) {
  const client = new TelegramClient(
    new StringSession(session),
    +apiId,
    apiHash,
    {
      deviceModel: process.env.DEVICE_MODEL,
      systemVersion: process.env.SYSTEM_VERSION,
      appVersion: process.env.APP_VERSION,
      testServers: TEST_SERVERS,
    },
  );
  if (client.disconnected) {
    await client.connect();
    client.setLogLevel(LogLevel.DEBUG);
  }
  if (TEST_SERVERS) {
    client.session.setDC(
      +process.env.TEST_DC_ID,
      process.env.TEST_SERVER_ADDRESS,
      +process.env.TEST_SERVER_PORT,
    );
  }

  // async function eventPrint(event: NewMessageEvent) {
  //   const message = event.message;

  //   // Checks if it's a private message (from user or bot)
  //   if (event.isPrivate) {
  //     // prints sender id
  //     console.log(message.senderId);
  //     console.log('message is', message.text);
  //     // read message
  //     if (message.text == 'hello') {
  //       const sender = await message.getSender();
  //       console.log('sender is', sender);
  //       await client.sendMessage(sender, {
  //         message: `hi your id is ${message.senderId}`,
  //       });
  //     }
  //   }
  // }
  // // adds an event handler for new messages
  // client.addEventHandler(eventPrint, new NewMessage({}));
  // client.setLogLevel(LogLevel.NONE);
  return client;
}
