// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UserAuthModule } from './user-auth/module/user.module';
// import { ReportController } from './user-auth/controller/user.controller';
// import { ReportService } from './user-auth/service/user.service';
// import { PrismaService } from 'prisma/prisma.service';
// import { DiabetesModule } from './diabetes/diabetes.module';
 
// @Module({
//   controllers: [ReportController],
//   providers: [ReportService, PrismaService],
//   imports: [DiabetesModule],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // ✅ เพิ่ม
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAuthModule } from './user-auth/module/user.module';
import { ReportController } from './user-auth/controller/user.controller';
import { ReportService } from './user-auth/service/user.service';
import { PrismaService } from 'prisma/prisma.service';
import { DiabetesModule } from './diabetes/diabetes.module';

@Module({
  controllers: [ReportController],
  providers: [ReportService, PrismaService],
  imports: [
    DiabetesModule,
    JwtModule.register({ // ✅ เพิ่มตรงนี้
      secret: 'my-secret-key', // 👉 จริงๆ ควรใช้ process.env.JWT_SECRET
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AppModule {}
