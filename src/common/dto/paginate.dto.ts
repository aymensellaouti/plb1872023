import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginateDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  nb: number;
}
