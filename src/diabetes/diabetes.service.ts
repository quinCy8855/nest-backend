import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PredictRequestDto } from './dto/predict-request.dto';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'prisma/prisma.service';
import { DailyNoteDto } from './dto/daily-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { DailyNote } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DiabetesService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async predictDiabetes(data: PredictRequestDto): Promise<any> {
    try {
      const result = await firstValueFrom(
        this.httpService.post('http://127.0.0.1:8000/predict', data),
      );
      return result.data;
    } catch (error) {
      console.error(
        '🔥 FastAPI error:',
        error?.response?.data || error.message,
      );
      throw error;
    }
  }

  private readonly tips: string[] = [
    'ดื่มน้ำวันละ 8 แก้วเพื่อให้ไตทำงานได้ดี 💧',
    'ออกกำลังกายอย่างน้อย 30 นาทีต่อวัน 🏃‍♀️',
    'หลีกเลี่ยงน้ำตาลเกิน 25g/วัน 🍰',
    'นอนให้เพียงพอ 7-9 ชั่วโมง 🛌',
    'งดสูบบุหรี่เพื่อปอดแข็งแรง 🚭',
    'รับประทานผักผลไม้ให้หลากสี 🌈',
  ];

  getTodayTip(): { tip: string } {
    const index = new Date().getDate() % this.tips.length;
    return { tip: this.tips[index] };
  }

  // daily-notes.service.ts

  async getTodayNotes(): Promise<DailyNoteDto[]> {
    const notes = await this.prisma.dailyNote.findMany({
      where: {
        date: new Date(),
      },
      orderBy: {
        id: 'asc',
      },
    });

    return plainToInstance(DailyNoteDto, notes);
  }

  async addNote(noteDto: CreateNoteDto): Promise<DailyNote> {
    console.log(noteDto, 'noteDtonoteDto');
    return this.prisma.dailyNote.create({
      data: {
        title: 'ประชุมทีมงาน',
        description: 'ประชุมเพื่อวางแผนงานไตรมาสหน้า',
        tags: 'Meeting',
        date: new Date(noteDto.date), // ✅ แก้ตรงนี้
        isToday: true,
        done: false,
      },
    });
  }
}
