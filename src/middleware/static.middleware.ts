import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

//封装readDir
const readDirFunc = (path: string): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(path, (err: Error, files: string[]) => {
      if (err) throw err;
      resolve(files);
    });
  });
};

@Injectable()
export class StaticMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // return async (req: Request, res: Response, next: NextFunction) => {
      const filenameArr = await readDirFunc(path.resolve('./public'));
      console.log('静态资源中间件', filenameArr);
      let targetFile: string | undefined;
      for (const filename of filenameArr) {
        if ('/' + filename == req.url) {
          targetFile = req.url;
          break;
        }
      }
      if (!targetFile) next();
      else {
        res.header('Content-Type', 'text/html');
        return res.sendFile(path.resolve(`./public${targetFile}`));
      }
    };
  // }
}
