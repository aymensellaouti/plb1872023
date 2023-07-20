import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoModel } from './model/todo.model';
import { INJECT_TOKENS } from '../common/config/constantes';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  todos: TodoModel[] = [];
  @Inject(INJECT_TOKENS.UUID) uuidV4;
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}
  addTodo(addTodoDto: AddTodoDto): Promise<Todo> {
    return this.todoRepository.save(addTodoDto);
  }

  async updateTodo(updatedTodoDto: UpdateTodoDto, id: string) {
    const todo = await this.todoRepository.preload({ id, ...updatedTodoDto });
    if (!todo) {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    return this.todoRepository.save(todo);
  }

  getTodos(): TodoModel[] {
    return this.todos;
  }
  getTodo(id: string): TodoModel {
    return this.getTodoById(id);
  }
  addFakeTodo(addTodoDto: AddTodoDto, userId: number): TodoModel {
    const { name, description } = addTodoDto;
    const newTodo = new TodoModel(this.uuidV4(), name, description, userId);
    this.todos.push(newTodo);
    return newTodo;
  }
  updateFakeTodo(updatedTodoDto: UpdateTodoDto, id: string, userId: number) {
    const { name, description, status } = updatedTodoDto;
    const todo = this.getTodoById(id);
    this.isOwner(todo, userId);
    todo.name = name ?? todo.name;
    todo.description = description ?? todo.description;
    todo.status = status ?? todo.status;
    return todo;
  }

  deleteTodo(id: string, userId: number) {
    const todo = this.getTodoById(id);
    this.isOwner(todo, userId);
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

  private isOwner(todo: TodoModel, userId: number) {
    if (todo.userId != userId) {
      throw new ForbiddenException('Vous n avez pas le droit de le faire ');
    }
  }
}
