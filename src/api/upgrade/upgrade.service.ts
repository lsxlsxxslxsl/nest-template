import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import Fetch from '../../utils/request';

@Injectable()
export class UpgradeService {
  async getChannelList(cookie: string) {
    try {
      const request = new Fetch('channel/list');
      const data = await request.fetch({
        method: 'POST',
        headers: {
          cookie
        },
      });

      return {
        statusCode: HttpStatus.OK,
        msg: 'success',
        data: data.data
      };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
