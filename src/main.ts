import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { join } from 'path';
// import { FlubErrorHandler } from 'nestjs-flub';
import { AppModule } from './app.module';
const config = dotenv.parse(
  fs.readFileSync(`./env/.${process.env.NODE_ENV}.env`),
);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === 'development' ? new Logger() : false,
  });
  const rootDir = join(__dirname, '..');

  // 开启CORS
  app.enableCors();
  // 全局路由前缀
  app.setGlobalPrefix('api');
  // 配置全局错误堆栈查看（仅在开发环境使用）
  // config.NODE_ENV === 'development' && app.useGlobalFilters(new FlubErrorHandler());
  // 开启静态资源
  app.useStaticAssets(join(rootDir, 'public'), {
    prefix: '/',
  });

  // 指定视图引擎 处理.html后缀文件
  // app.engine('log', swig.renderFile);
  // // 视图引擎
  // app.set('view engine', 'log');
  // // 配置模板（视图）的基本目录
  // app.setBaseViewsDir(join(rootDir, 'logs'));
  // swig.setDefaults({ cache: false });

  // 配置 Swagger
  const options = new DocumentBuilder()
    .addBearerAuth() // 开启 BearerAuth 授权认证
    .setTitle('upgrade-api')
    .setDescription('运营平台API接口文档')
    .setVersion('1.0')
    // .addTag('接口文档')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(3000);
  console.log(`Server running at: ${config.HOST}:${config.PORT}`);
}
bootstrap();
