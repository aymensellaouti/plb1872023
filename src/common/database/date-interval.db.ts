import { SelectQueryBuilder } from 'typeorm';

export const addDateInterval = <Entity>(
  qb: SelectQueryBuilder<Entity>,
  dateName: string,
  dateMin?: Date,
  dateMax?: Date,
) => {
  if (dateMin) {
    qb.andWhere(`${dateName} >= :dateMin`, { dateMin });
  }
  if (dateMax) {
    qb.andWhere(`${dateName} <= :dateMax`, { dateMax });
  }
};
