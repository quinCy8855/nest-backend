import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; // เพิ่มตรงนี้
import { useContainer } from 'class-validator'; // ใช้เพื่อ resolve dependency injection ใน DTO (optional)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //   Setup ValidationPipe สำหรับ class-validator + class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //  แปลง payload เป็น instance ของ class (ใช้ class-transformer)
      whitelist: true, //  ลบ field ที่ไม่อยู่ใน DTO
      forbidNonWhitelisted: true, // ❗ถ้ามี field แปลก ๆ จะ throw error
    }),
  );

    app.enableCors(); 
  //  Optional: รองรับ Dependency Injection ใน class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
bootstrap();
