import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { EnvService } from '../config/env.service';
import { AuthGuard } from '../guard/auth.guard';
import { CreateApiDTO } from './dto/api.dto';

export class UpdateCatDto {
  name: string;
}
const user = {
  gender: 'male',
};

@ApiHeader({
  name: 'Authorization',
  description: 'Auth token',
})
@ApiBasicAuth()
@ApiBearerAuth()
@ApiTags('example')
@Controller('client')
@UseGuards(new AuthGuard())
export class ApiController {
  constructor(private readonly config: EnvService) {}

  @Post()
  @ApiOperation({ summary: '创建API' })
  @ApiBody({
    description: '创建API',
    type: CreateApiDTO,
  })
  @HttpCode(200)
  async create(@Body() createApi: CreateApiDTO) {
    // throw new InternalServerErrorException()
    // throw new Error('Very Bad Error');
    return {
      name: createApi.name,
      age: createApi.age,
      gender: user.gender,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return `This action removes a #${id} cat`;
  }

  @Put(':id')
  async update(@Param('id') id, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return `This action returns a #${id} cat`;
  }

  @Get()
  async findAll(@Query() query) {
    throw new InternalServerErrorException();
    // return `This action returns all cats (limit: ${query.limit} items) ${this.config.port}`;
  }
}
