import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContents {
  @ApiProperty({ example: 'Today I eat Dog!!' })
  @IsNotEmpty()
  @IsString()
  contentFromUser: string;

  @ApiProperty({ example: 'user123' })
  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
