import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse<Response>(); // 在请求上下文中获取 response 对象
    const request = ctx.getRequest<Request>(); // 在请求上下文中获取 request 对象
    const status = exception.getStatus(); // 获取异常的状态码

    const logFormat = `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  Request original url: ${request.originalUrl}
  Method: ${request.method}
  IP: ${request.ip}
  Status code: ${status}
  Response: ${exception.toString()} \n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    `;
    Logger.warn(logFormat);

    response.status(status).json({
      statusCode: status,
      error: exception.message,
      msg: `${status >= 500 ? 'Service Error' : 'Client Error'}`,
    });
  }
}
