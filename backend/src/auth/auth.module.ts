import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule], // Import RedisModule to use RedisService

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
