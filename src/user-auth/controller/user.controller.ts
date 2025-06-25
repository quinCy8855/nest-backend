import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ReportService } from '../service/user.service';
import { CreateWorkLogDto } from '../dto/user.dto/create-work-log.dto';
import { GetWorkLogDto } from '../dto/user.dto/get-work-log.dto';
import { CreateContents } from '../dto/user.dto/create-content.dto';
import { CreateUserDto } from '../dto/user.dto/create-user.dto';
 import { UnauthorizedException } from '@nestjs/common';
@Controller('reports')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  async getAllReports() {
    return this.reportService.getAllReports();
  }

  @Get('work-log')
  getWorkLogs(@Query() query: GetWorkLogDto) {
    return this.reportService.findWorkLogs(query);
  }

  @Post('work-log') // POST /user/work-log
  async createWorkLog(@Body() body: CreateWorkLogDto) {
    return this.reportService.createWorkLog(body);
  }

  @Get('by-username/:username')
  getWorkLogsByUsername(@Param('username') username: string) {
    return this.reportService.findByUsernameGroupedByDate(username);
  }

  @Post('create-content')
  async postContentSocialMedia(@Body() body: CreateContents) {
    return this.reportService.createContent(body);
  }
  @Post('get-all')
  async getContentSocialMedia(@Body() body: CreateContents) {
    return this.reportService.findManyData(body);
  }

  @Post('create-user')
  async createUser(@Body() body: CreateUserDto) {
    return this.reportService.createUser(body);
  }

   @Post('login')
    async login(@Body() body: CreateUserDto) {
  const user = await this.reportService.validateUser(body);
  if (!user) {
      throw new UnauthorizedException();
  }
  return this.reportService.login(user);
}
}
