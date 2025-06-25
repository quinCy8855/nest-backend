// user-auth/dto/user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: number;

  @ApiProperty({ description: 'The username of the user' })
  userName: string;

  @ApiProperty({ description: 'The email of the user' })
  email: string;
}
