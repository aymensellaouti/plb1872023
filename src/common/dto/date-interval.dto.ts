import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class DateIntervalDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateMin: Date;
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateMax: Date;
}
