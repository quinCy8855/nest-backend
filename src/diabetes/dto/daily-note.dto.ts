import { ApiProperty } from '@nestjs/swagger';

export class DailyNoteDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2025-05-18', description: 'วันที่ของโน้ต' })
  date: string;

  @ApiProperty({ example: 'ประชุมโปรเจกต์ AI', description: 'ชื่อโน้ต' })
  title: string;

  @ApiProperty({
    example: 'พูดคุยเกี่ยวกับความคืบหน้าในการพัฒนาโมดูลวิเคราะห์โรค',
    description: 'รายละเอียดโน้ต',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 'Meeting',
    description: 'แท็กของโน้ต',
    required: false,
  })
  tags?: string;

  @ApiProperty({
    example: true,
    description: 'เป็นโน้ตของวันนี้หรือไม่',
    required: false,
  })
  isToday?: boolean;

  @ApiProperty({
    example: false,
    description: 'สถานะการทำเสร็จของโน้ต',
    required: false,
  })
  done?: boolean;

  @ApiProperty({
    example: '2025-05-18T10:30:00.000Z',
    description: 'เวลาสร้างโน้ต',
  })
  createdAt: string;
}
