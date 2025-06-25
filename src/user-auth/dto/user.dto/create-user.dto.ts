import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'kookkik' })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ example: 'user123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  
  @ApiProperty({ example: 'user' })
  @IsNotEmpty()
  @IsString()
  role: string;
}
