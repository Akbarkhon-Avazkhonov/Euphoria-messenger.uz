import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionGateway } from './session.gateway';
import { RedisModule } from 'src/redis/redis.module';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [RedisModule, TelegramModule], // Import RedisModule to use RedisService
  providers: [SessionGateway, SessionService],
})
export class SessionModule {}
