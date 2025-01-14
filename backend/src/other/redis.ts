import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({ url: process.env.REDIS_URL });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, {
      ...options,

      cors: {
        origin: [
          'http://localhost:3000',
          'https://admin.socket.io',
          'https://euphoria-messenger.uz',
        ],
        methods: ['GET', 'POST'],
        credentials: true,
        maxHttpBufferSize: 1e10,
      },
      transports: ['websocket', 'polling'], // Allow multiple transports
    });
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('events').EventEmitter.defaultMaxListeners = 30;

    server.adapter(this.adapterConstructor);
    return server;
  }
}
