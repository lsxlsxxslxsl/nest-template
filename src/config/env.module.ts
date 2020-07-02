import { Global, Module } from '@nestjs/common';
import { EnvService } from './env.service';

@Global()
@Module({
  providers: [
    {
      provide: EnvService,
      useValue: new EnvService(`./env/.${ process.env.NODE_ENV }.env`),
    }
  ],
  exports: [EnvService],
})
export class EnvModule { }
