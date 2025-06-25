import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkLogDto {
  @ApiProperty({ example: 'HR' })
  @IsNotEmpty()
  @IsString()
  businessArea: string;

  @ApiProperty({ example: '2025-04-30' })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2025-04-30' })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: '8h' })
  @IsNotEmpty()
  @IsString()
  timeSpentPerDay: string;

  @ApiProperty({
    example: 'Document processing and HR meetings',
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({ example: 'user123' })
  @IsNotEmpty()
  @IsString()
  createdBy: string;
}
