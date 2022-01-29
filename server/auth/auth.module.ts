import { Module } from '@nestjs/common';
import { CarService } from 'server/auth/car.service';
import { SharedModule } from 'shared/shared.module';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [CarService],
  imports: [SharedModule]
})
export class AuthModule {}
