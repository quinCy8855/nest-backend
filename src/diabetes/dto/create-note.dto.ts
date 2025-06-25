import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    example: 'ประชุมทีมงาน',
    description: 'หัวข้อของโน้ต',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'ประชุมเพื่อวางแผนงานไตรมาสหน้า',
    description: 'รายละเอียดของโน้ต',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'Meeting',
    description: 'แท็กของโน้ต เช่น Important, Meeting, To-do',
    required: false,
  })
  @IsOptional()
  @IsString()
  tags?: string;

  @ApiProperty({
    example: '2025-05-18',
    description: 'วันที่ของโน้ต (YYYY-MM-DD)',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    example: true,
    description: 'ระบุว่าเป็นโน้ตของวันนี้หรือไม่',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isToday?: boolean;

  @ApiProperty({
    example: false,
    description: 'สถานะการทำเสร็จของโน้ต',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
