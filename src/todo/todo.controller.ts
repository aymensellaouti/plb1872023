import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { TodoModel } from './model/todo.model';

import { Request } from 'express';

import { v4 as uuidv4 } from 'uuid';
@Controller('todo')
export class TodoController {
  todos: TodoModel[] = [
    new TodoModel(1, 'lundi', 'entamer la semaine'),
    new TodoModel(2, 'mardi', 'formation NestJs'),
  ];

  @Get()
  getTodos(): TodoModel[] {
    return this.todos;
  }

  @Post()
  @HttpCode(202)
  addTodo(@Body() partialTodo: Partial<TodoModel>): TodoModel {
    const { name, description } = partialTodo;
    const newTodo = new TodoModel(uuidv4(), name, description);
    this.todos.push(newTodo);
    return newTodo;
  }
}
