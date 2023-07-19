import { ValidationArguments } from 'class-validator';

export const lengthErrorMessage = (isMin = true) => {
  let type = 'minimale';
  if (!isMin) {
    type = 'maximale';
  }
  return (validationArguments: ValidationArguments) => {
    console.log({ validationArguments });
    return `la taille ${type} de ${validationArguments.property} doit être ${validationArguments.constraints[0]}`;
  };
};
