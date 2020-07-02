import { Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpgradeService } from './upgrade.service';

@ApiTags('资源升级')
@Controller('upgrade')
export class UpgradeController {
  constructor(private readonly upgradeService: UpgradeService) {}

  @ApiOperation({ summary: '升级配置列表' })
  @Post('channels')
  @HttpCode(200)
  getChannelList(@Headers('cookie') cookie: string) {
    return this.upgradeService.getChannelList(cookie);
  }
}
