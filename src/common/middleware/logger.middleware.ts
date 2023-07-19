import { Request, Response } from 'express';

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  console.log({ ip: req.ip });
  console.log({ userAgent: req.get('user-agent') });
  next();
};
