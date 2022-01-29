import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/fullstack-sample-project/browser')
    }),
    AuthModule,
    SharedModule
  ],
})
export class AppModule {}
