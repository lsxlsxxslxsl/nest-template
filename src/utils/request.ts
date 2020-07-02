import * as dotenv from 'dotenv';
import * as fs from 'fs';
import fetch, { RequestInit } from 'node-fetch';
const baseUrl: string = dotenv.parse(
  fs.readFileSync(`./env/.${process.env.NODE_ENV}.env`),
).BASE_URL;

interface IRequestResult {
  code: number;
  message: string;
  data: any;
}

class Request {
  url: string;
  baseUrl: string;

  constructor(url: string) {
    this.url = url;
    this.baseUrl = baseUrl;
  }

  fetch(options?: RequestInit): Promise<any> {
    //产生一个完整的链接 发起一个promise的结结果
    const request = !options
      ? fetch(this.baseUrl + this.url)
      : fetch(this.baseUrl + this.url, options);

    return new Promise((resolve, reject) => {
      const result: IRequestResult = {
        code: 0,
        message: '',
        data: [],
      };
      request
        .then(res => {
          let _json = {};
          try {
            _json = res.json();
          } catch (error) {
            // 报错
            reject(error)
          }
          return _json;
        })
        .then(json => {
          result.data = json;
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
export default Request;
