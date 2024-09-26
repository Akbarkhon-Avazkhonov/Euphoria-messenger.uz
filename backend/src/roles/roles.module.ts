import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule], // Import RedisModule to use RedisService
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
