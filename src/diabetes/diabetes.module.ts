import { Module } from '@nestjs/common';
import { DiabetesService } from './diabetes.service';
import { DiabetesController } from './diabetes.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [DiabetesController],
  providers: [DiabetesService, PrismaService],
})
export class DiabetesModule {}
