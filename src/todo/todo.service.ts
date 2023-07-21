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
import { Brackets, ILike, Repository, UpdateResult } from 'typeorm';
import { Todo } from './entity/todo.entity';
import { SearchDto } from './dto/search.dto';
import { withName } from '../common/database/withname.db';
import { paginate } from '../common/database/paginate.db';
import { DateIntervalDto } from '../common/dto/date-interval.dto';
import { addDateInterval } from '../common/database/date-interval.db';

@Injectable()
export class TodoService {
  todos: TodoModel[] = [];
  @Inject(INJECT_TOKENS.UUID) uuidV4;
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  getTodos(searchCriteria: SearchDto): Promise<Todo[]> {
    const criterias = [];
    const { status, criteria } = searchCriteria;
    if (status) {
      criterias.push({ status });
    }
    if (criteria) {
      criterias.push({ name: ILike(`%${criteria}%`) });
      criterias.push({ description: ILike(`%${criteria}%`) });
    }
    return this.todoRepository.find({ where: criterias });
  }

  getQbTodos(searchCriteria: SearchDto) {
    const qb = this.todoRepository.createQueryBuilder('t');
    const { status, criteria, nb, page } = searchCriteria;
    /*     withName(qb, 'mercredi'); */

    if (nb) {
      paginate<Todo>(qb, page, nb);
    }

    if (status) {
      qb.where('t.status = :status', { status });
    }
    if (criteria) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.where(`t.name like :name`, { name: `%${criteria}%` }).orWhere(
            `t.name like :description`,
            { description: `%${criteria}%` },
          );
        }),
      );
    }
    return qb.getMany();
  }

  getStats(dateIntervalDto: DateIntervalDto) {
    const { dateMin, dateMax } = dateIntervalDto;
    const qb = this.todoRepository.createQueryBuilder('t');
    addDateInterval<Todo>(qb, 'created_at', dateMin, dateMax);
    return qb
      .select('t.status, count(t.id) as number')
      .groupBy('t.status')
      .getRawMany();
  }

  async getTodo(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    return todo;
  }

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

  async deleteTodo(id: string): Promise<UpdateResult> {
    const result = await this.todoRepository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    return result;
  }
  async restoreTodo(id: string): Promise<UpdateResult> {
    const result = await this.todoRepository.restore(id);
    if (!result.affected) {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    return result;
  }

  getFakeTodo(id: string): TodoModel {
    return this.getTodoById(id);
  }

  getFakeTodos(): TodoModel[] {
    return this.todos;
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

  deleteFakeTodo(id: string, userId: number) {
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
