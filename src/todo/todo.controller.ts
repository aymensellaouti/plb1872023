import {
  Body,
  Controller,
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

import { v4 as uuidv4 } from 'uuid';
@Controller('todo')
export class TodoController {
  todos: TodoModel[] = [
    /*  new TodoModel(uuidv4(), 'lundi', 'entamer la semaine'),
    new TodoModel(uuidv4(), 'mardi', 'formation NestJs'),
 */
  ];

  @Get()
  getTodos(): TodoModel[] {
    return this.todos;
  }
  @Get(':id')
  getTodo(@Param('id') id: string): TodoModel {
    return this.getTodoById(id);
  }

  @Post()
  @HttpCode(202)
  addTodo(@Body() partialTodo: Partial<TodoModel>): TodoModel {
    const { name, description } = partialTodo;
    const newTodo = new TodoModel(uuidv4(), name, description);
    this.todos.push(newTodo);
    return newTodo;
  }

  @Patch(':id')
  updateTodo(@Body() updatedTodo: Partial<TodoModel>, @Param('id') id: string) {
    const { name, description, status } = updatedTodo;
    const todo = this.getTodoById(id);
    todo.name = name ?? todo.name;
    todo.description = description ?? todo.description;
    todo.status = status ?? todo.status;
    return todo;
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    const todo = this.getTodoById(id);
    this.todos = this.todos.filter((todo) => todo.id != id);
    return { count: 1 };
  }

  private getTodoById(id: string) {
    const todo = this.todos.find((actualTodo) => actualTodo.id == id);
    if (!todo) {
      throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
    }
    return todo;
  }
}
