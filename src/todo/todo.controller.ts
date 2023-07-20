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
  UseFilters,
} from '@nestjs/common';
import { TodoModel } from './model/todo.model';

import { Request } from 'express';

import { UpdateTodoDto } from './dto/update-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './todo.service';
import { FusionPipe } from '../common/pipe/fusion/fusion.pipe';
import { CustomFilter } from '../filter/custom/custom.filter';
@Controller({
  path: 'todo',
  version: '1',
})
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('all')
  getTodos(): TodoModel[] {
    return this.todoService.getFakeTodos();
  }

  @Get(':id?')
  getTodo(@Param('id') id: string = '145'): TodoModel {
    console.log(id);
    return this.todoService.getFakeTodo(id);
  }

  @Post()
  @HttpCode(202)
  addTodo(@Body() addTodoDto: AddTodoDto, @Req() request: Request): TodoModel {
    const userId = request['userId'];
    return this.todoService.addFakeTodo(addTodoDto, userId);
  }

  @Patch(':id')
  @UseFilters(CustomFilter)
  updateTodo(
    @Body() updatedTodoDto: UpdateTodoDto,
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    const userId = request['userId'];
    console.log({ userId });

    return this.todoService.updateFakeTodo(updatedTodoDto, id, userId);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string, @Req() request: Request) {
    const userId = request['userId'];
    return this.todoService.deleteFakeTodo(id, userId);
  }
}
