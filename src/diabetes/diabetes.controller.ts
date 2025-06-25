import { Controller, Post, Body, Get } from '@nestjs/common';
import { DiabetesService } from './diabetes.service';
import { PredictRequestDto } from './dto/predict-request.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { DailyNoteDto } from './dto/daily-note.dto';

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0;
    this.next = next ?? null;
  }
}

@Controller('diabetes')
export class DiabetesController {
  constructor(private readonly diabetesService: DiabetesService) {}

  @Post('predict')
  async predict(@Body() body: PredictRequestDto) {
    console.log(body, 'body');
    return this.diabetesService.predictDiabetes(body);
  }

  @Get('daily-tip')
  getDailyTip() {
    return this.diabetesService.getTodayTip();
  }

  @Get('get-notes')
  getTodayNotes(): Promise<DailyNoteDto[]> {
    return this.diabetesService.getTodayNotes();
  }

  @Post('crate-notes')
  addNote(@Body() noteDto: CreateNoteDto) {
    return this.diabetesService.addNote(noteDto);
  }

  @Get('test-function')
  test(): number[] {
    // Mock linked lists: (2 -> 4 -> 3) + (5 -> 6 -> 4)
    const l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
    const l2 = new ListNode(5, new ListNode(6, new ListNode(4)));

    const result = this.addTwoNumbers(l1, l2);
    return this.toArray(result);
  }

  addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry !== 0) {
      const val1 = l1 ? l1.val : 0;
      const val2 = l2 ? l2.val : 0;
      const sum = val1 + val2 + carry;

      carry = Math.floor(sum / 10);
      const digit = sum % 10;

      current.next = new ListNode(digit);
      current = current.next;

      if (l1) l1 = l1.next;
      if (l2) l2 = l2.next;
    }

    return dummy.next;
  }

  toArray(node: ListNode | null): number[] {
    const result: number[] = [];
    while (node !== null) {
      result.push(node.val);
      node = node.next;
    }
    return result;
  }
}
