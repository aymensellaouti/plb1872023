import { Injectable, NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository, UpdateResult } from 'typeorm';
import { HasId } from './has-id.interface';

@Injectable()
export class GenericService<Entity extends HasId> {
  constructor(private repository: Repository<Entity>) {}

  findAll(): Promise<Entity[]> {
    return this.repository.find();
  }

  async findOne(id): Promise<Entity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`L'element d'id ${id} n'existe pas`);
    }
    return entity;
  }

  create(dto: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(dto);
  }

  async update(dto, id) {
    const entity = await this.repository.preload({ id, ...dto });
    if (!entity) {
      throw new NotFoundException(`L'element d'id ${id} n'existe pas`);
    }
    return this.repository.save(entity);
  }

  async remove(id): Promise<UpdateResult> {
    const result = await this.repository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException(`L'element' d'id ${id} n'existe pas`);
    }
    return result;
  }
  async restore(id): Promise<UpdateResult> {
    const result = await this.repository.restore(id);
    if (!result.affected) {
      throw new NotFoundException(`L'element d'id ${id} n'existe pas`);
    }
    return result;
  }
}
