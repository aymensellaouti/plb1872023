import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidationArguments,
} from 'class-validator';
import { lengthErrorMessage } from '../../common/error/length-message.error';
import { Type } from 'class-transformer';

export class AddTodoDto {
  @IsString()
  @MinLength(3, { message: lengthErrorMessage() })
  @MaxLength(15, { message: lengthErrorMessage(false) })
  name: string;
  @IsString()
  @MinLength(10, { message: lengthErrorMessage() })
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  priority: number;
}
