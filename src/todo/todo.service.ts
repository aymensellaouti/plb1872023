import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoModel } from './model/todo.model';
import { INJECT_TOKENS } from '../common/config/constantes';

@Injectable()
export class TodoService {
  todos: TodoModel[] = [];
  @Inject(INJECT_TOKENS.UUID) uuidV4;
  getTodos(): TodoModel[] {
    return this.todos;
  }
  getTodo(id: string): TodoModel {
    return this.getTodoById(id);
  }
  addTodo(addTodoDto: AddTodoDto): TodoModel {
    const { name, description } = addTodoDto;
    const newTodo = new TodoModel(this.uuidV4(), name, description);
    this.todos.push(newTodo);
    return newTodo;
  }
  updateTodo(updatedTodoDto: UpdateTodoDto, id: string) {
    const { name, description, status } = updatedTodoDto;
    const todo = this.getTodoById(id);
    todo.name = name ?? todo.name;
    todo.description = description ?? todo.description;
    todo.status = status ?? todo.status;
    return todo;
  }

  deleteTodo(id: string) {
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
