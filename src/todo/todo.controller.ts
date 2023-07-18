import { Controller, Get } from '@nestjs/common';
import { TodoModel } from './model/todo.model';

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
}
