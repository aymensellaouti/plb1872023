import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TodoStatusEnum } from '../model/todo.model';

export class SearchDto {
  @IsOptional()
  @IsString()
  criteria: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
