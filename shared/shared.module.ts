import { Module } from '@nestjs/common';
import { ConnectionRedisService } from './connection-redis.service';

@Module({
  providers: [ConnectionRedisService],
  exports: [ConnectionRedisService],
})
export class SharedModule {}
