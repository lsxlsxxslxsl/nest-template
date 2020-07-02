import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '../pipe/validation.pipe';
import { ApiController } from './api.controller';
import { UpgradeModule } from './upgrade/upgrade.module';

@Module({
  imports: [UpgradeModule],
  controllers: [ApiController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class ApiModule {}
