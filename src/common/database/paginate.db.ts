import { SelectQueryBuilder } from 'typeorm';

export const paginate = <Entity>(
  qb: SelectQueryBuilder<Entity>,
  page = 1,
  nb = 10,
) => {
  qb.skip((page - 1) * nb);
  qb.take(nb);
};
