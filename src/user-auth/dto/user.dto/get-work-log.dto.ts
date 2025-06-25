import { IsString, IsOptional } from 'class-validator';

export class GetWorkLogDto {
  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  username: string;
}
