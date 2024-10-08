import { Request, Response, NextFunction } from 'express';
import AppError from './AppError';

interface IRequest extends Request {
    user?: {
        id: number;
    }
}

export default function isAuthorized(
  request: IRequest,
  response: Response,
  next: NextFunction
): void {
  const { id } = request.params;

  if (request.user?.id !== Number(id)) {
    throw new AppError(
        401, 
        'Not found', 
        'Token não autorizado');
  }

  next();
}
