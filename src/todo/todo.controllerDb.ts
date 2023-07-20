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
import { Todo } from './entity/todo.entity';
@Controller({
  path: 'todo',
  version: '2',
})
export class TodoControllerDb {
  constructor(private todoService: TodoService) {}

  @Post()
  create(@Body() addTodoDto: AddTodoDto): Promise<Todo> {
    return this.todoService.addTodo(addTodoDto);
  }

  @Patch(':id')
  updateTodo(
    @Body() updatedTodoDto: UpdateTodoDto,
    @Param('id') id: string,
  ): Promise<Todo> {
    return this.todoService.updateTodo(updatedTodoDto, id);
  }

  /* @Get('all')
  getTodos(): TodoModel[] {
    return this.todoService.getTodos();
  }

  @Get(':id?')
  getTodo(@Param('id') id: string = '145'): TodoModel {
    console.log(id);
    return this.todoService.getTodo(id);
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

    return this.todoService.updateTodo(updatedTodoDto, id, userId);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string, @Req() request: Request) {
    const userId = request['userId'];
    return this.todoService.deleteTodo(id, userId);
  }
} */
}
