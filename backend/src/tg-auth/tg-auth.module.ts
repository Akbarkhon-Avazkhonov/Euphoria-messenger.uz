import { Module } from '@nestjs/common';
import { TgAuthService } from './tg-auth.service';
import { TgAuthController } from './tg-auth.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule], // Import RedisModule to use RedisService
  controllers: [TgAuthController],
  providers: [TgAuthService],
})
export class TgAuthModule {}
