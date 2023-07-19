export enum TodoStatusEnum {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}

export class TodoModel {
  constructor(
    public id = '',
    public name = '',
    public description = '',
    public userId: number,
    public createdAt = new Date(),
    public status: TodoStatusEnum = TodoStatusEnum.waiting,
  ) {}
}
