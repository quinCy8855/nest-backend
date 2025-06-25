import { ApiProperty } from '@nestjs/swagger';

export class PredictRequestDto {
  @ApiProperty({ example: 2, description: 'จำนวนครั้งตั้งครรภ์' })
  Pregnancies: number;

  @ApiProperty({ example: 120, description: 'น้ำตาลในเลือด (mg/dL)' })
  Glucose: number;

  @ApiProperty({ example: 70, description: 'ความดันโลหิต (mm Hg)' })
  BloodPressure: number;

  @ApiProperty({ example: 25, description: 'ความหนาผิวหนัง (mm)' })
  SkinThickness: number;

  @ApiProperty({ example: 100, description: 'อินซูลิน (mu U/ml)' })
  Insulin: number;

  @ApiProperty({ example: 24.5, description: 'BMI (kg/m²)' })
  BMI: number;

  @ApiProperty({ example: 0.35, description: 'ความเสี่ยงทางพันธุกรรม' })
  DiabetesPedigreeFunction: number;

  @ApiProperty({ example: 35, description: 'อายุ (ปี)' })
  Age: number;
}
