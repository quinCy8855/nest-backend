import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateWorkLogDto } from '../dto/user.dto/create-work-log.dto';
import { GetWorkLogDto } from '../dto/user.dto/get-work-log.dto';
import { CreateContents } from '../dto/user.dto/create-content.dto';
import { CreateUserDto } from '../dto/user.dto/create-user.dto';
 import { JwtService } from '@nestjs/jwt';


@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService ,   private jwtService: JwtService,) {}

  async getAllReports() {
    return this.prisma.mst_users.findMany();
  }

  async createWorkLog(data: CreateWorkLogDto) {
    return this.prisma.workLog.create({
      data: {
        businessArea: data.businessArea,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        timeSpentPerDay: data.timeSpentPerDay,
        description: data.description ?? '',
        createdBy: data.createdBy,
      },
    });
  }

  async findWorkLogs(dto: GetWorkLogDto) {
    const { startDate, endDate, username } = dto;

    return this.prisma.workLog.findMany({
      where: {
        createdBy: username,
        startDate: {
          gte: new Date(startDate),
        },
        endDate: {
          lte: new Date(endDate),
        },
      },
    });
  }

  async createContent(body: CreateContents) {
    const data = await this.prisma.content.create({
      data: {
        contentFromUser: body.contentFromUser,
        createdBy: body.createdBy,
      },
    });
    return data;
  }

  async findManyData(body: CreateContents) {
    const data = await this.prisma.content.findMany({
      where: {
        createdBy: body.createdBy,
      },
      orderBy: {
        id: 'desc',
      },
    });
    return data;
  }

  async findByUsernameGroupedByDate(username: string) {
    const workLogs = await this.prisma.workLog.findMany({});

    // Group by date string (YYYY-MM-DD)
    const grouped = workLogs.reduce(
      (acc, log) => {
        const dateKey = log.startDate.toISOString().split('T')[0]; // '2025-05-06'
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(log);
        return acc;
      },
      {} as Record<string, any[]>,
    );

    // Convert to array format
    return Object.entries(grouped).map(([date, logs]) => ({
      date,
      workLogs: logs,
    }));
  }

  async createUser(body: CreateUserDto){
    console.log(body,"bodybody")
    const data = await this.prisma.mst_users.create({
      data: {
      user_name :body.userName,
      password  : body.password,
      email    : body.userName,
      role: body.role,
      },
       select: { // ✅ เลือกเฉพาะ field ที่จะคืนกลับ
      id: true,
      user_name: true,
      email: true,
      role: true,
      create_dt: true,
    },
    });
    return data;
  }

 async login(user: any) {
  const payload = { username: user.user_name, role: user.role };
  const token = this.jwtService.sign(payload);

  return {
    user,
    token,
  };
}


  async validateUser(body: CreateUserDto) {
  const user = await this.prisma.mst_users.findFirst({
    where: {
      user_name: body.userName,
    },
  });
  return user;
}

}
