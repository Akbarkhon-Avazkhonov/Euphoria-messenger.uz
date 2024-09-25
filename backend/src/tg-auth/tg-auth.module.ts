import { Module } from '@nestjs/common';
import { TgAuthService } from './tg-auth.service';
import { TgAuthController } from './tg-auth.controller';

@Module({
  controllers: [TgAuthController],
  providers: [TgAuthService],
})
export class TgAuthModule {}
