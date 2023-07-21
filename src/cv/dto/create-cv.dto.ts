import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCvDto {
  @IsString()
  name: string;
  @IsNumber()
  @Type(() => Number)
  age: number;
  @IsString()
  job: string;
  @IsString()
  @IsOptional()
  path: string;
}
