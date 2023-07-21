import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HasId } from './has-id.interface';

@Injectable()
export class GenericService<Entity extends HasId> {
  constructor(private repository: Repository<Entity>) {}

  findAll(): Promise<Entity[]> {
    return this.repository.find();
  }

  async find(id): Promise<Entity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`L'element d'id ${id} n'existe pas`);
    }
    return entity;
  }

  /*   addTodo(addTodoDto: AddTodoDto): Promise<Todo> {
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
  } */
}
