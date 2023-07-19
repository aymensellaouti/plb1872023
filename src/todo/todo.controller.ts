import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { TodoModel } from './model/todo.model';

import { Request } from 'express';

import { UpdateTodoDto } from './dto/update-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './todo.service';
import { FusionPipe } from '../common/pipe/fusion/fusion.pipe';
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('all')
  getTodos(): TodoModel[] {
    return this.todoService.getTodos();
  }

  @Get(':id?')
  getTodo(@Param('id') id: string = '145'): TodoModel {
    console.log(id);
    return this.todoService.getTodo(id);
  }

  @Post()
  @HttpCode(202)
  addTodo(@Body() addTodoDto: AddTodoDto): TodoModel {
    console.log({ addTodoDto });

    console.log(addTodoDto instanceof AddTodoDto);

    return this.todoService.addTodo(addTodoDto);
  }

  @Patch(':id')
  updateTodo(@Body() updatedTodoDto: UpdateTodoDto, @Param('id') id: string) {
    return this.todoService.updateTodo(updatedTodoDto, id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
  }
}
