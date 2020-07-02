import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '../utils/log4js';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    const now: number = +new Date();
    return next.handle().pipe(
      map(data => {
        const logFormat = `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  Request original url: ${req.originalUrl}
  Method: ${req.method}
  IP: ${req.ip}
  User: ${JSON.stringify(req.user)}
  ExecTime: ${+new Date() - now}ms
  Response data: ${JSON.stringify(data)} \n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        `;

        Logger.access(logFormat);
        return data;
      }),
    );
  }
}
