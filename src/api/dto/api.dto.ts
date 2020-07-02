import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateApiDTO {
  @ApiProperty({
    description: '姓名',
    example: '张三'
  })
  @IsString({ message: 'name必须是 String 类型' })
  @IsNotEmpty({ message: 'name不能为空' })
  readonly name: string;

  @ApiProperty({
    description: '年龄',
    example: 18
  })
  @IsInt()
  @IsNotEmpty({ message: '年龄不能为空' })
  readonly age: number;
}
