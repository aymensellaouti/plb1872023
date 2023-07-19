import {
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { lengthErrorMessage } from '../../common/error/length-message.error';
import { TodoStatusEnum } from '../model/todo.model';
import { PartialType } from '@nestjs/mapped-types';
import { AddTodoDto } from './add-todo.dto';

export class UpdateTodoDto extends PartialType(AddTodoDto) {
  @IsEnum(TodoStatusEnum)
  @IsOptional()
  status: TodoStatusEnum;
}
