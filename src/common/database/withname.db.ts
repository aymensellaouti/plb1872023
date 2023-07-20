import { SelectQueryBuilder } from 'typeorm';

export const withName = <T>(
  qb: SelectQueryBuilder<T>,
  name: string,
): SelectQueryBuilder<T> => {
  qb.where('name= :name', { name });
  return qb;
};
