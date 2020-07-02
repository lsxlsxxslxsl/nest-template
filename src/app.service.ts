import { Injectable } from '@nestjs/common';
import { EnvService } from './config/env.service';

@Injectable()
export class AppService {
  constructor(private readonly config: EnvService) {}

  getHello(): string {
    return `Hello World! ${this.config.port}`;
  }
}
