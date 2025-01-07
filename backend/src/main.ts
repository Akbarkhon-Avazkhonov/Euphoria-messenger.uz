import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './other/redis';
import * as fs from 'fs';

async function bootstrap() {
  let httpsOptions = undefined;

  // Используем SSL, если установлена переменная окружения PRODUCTION
  // if (process.env.PRODUCTION) {
  //   httpsOptions = {
  //     key: fs.readFileSync('live/euphoria-messenger.uz/privkey.pem'),
  //     cert: fs.readFileSync('live/euphoria-messenger.uz/fullchain.pem'),
  //   };
  // }

  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    ...(httpsOptions && { httpsOptions }), // Добавляем httpsOptions, если SSL включен
  });

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  const config = new DocumentBuilder()
    .setTitle('Euphoria messenger API')
    .setVersion(process.env.npm_package_version)
    .setDescription('POWERED BY PHOENIX SOLUTIONS and AKBARKHON !AVAZKHONOV')
    .addServer('/', 'Development server')
    .addServer('/api', 'Production server')
    .addCookieAuth('token', {
      type: 'apiKey', // Используем 'apiKey'
      in: 'cookie', // Указываем, что это cookie
      name: 'token', // Имя cookie
      description: 'Authorization cookie',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
      withCredentials: true,
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Euphoria messenger API',
    customfavIcon: 'https://phoenix-solutions.uz/image%2073.png',
  });

  app.enableCors({
    origin: 'https://euphoria-messenger.uz',
    credentials: true,
  });

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
