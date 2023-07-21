import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TodoStatusEnum } from '../model/todo.model';
import { PaginateDto } from '../../common/dto/paginate.dto';

export class SearchDto extends PaginateDto {
  @IsOptional()
  @IsString()
  criteria: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
