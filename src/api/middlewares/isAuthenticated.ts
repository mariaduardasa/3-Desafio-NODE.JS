import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from './AppError';
import authConfig from '../config/authConfig';

interface IRequest extends Request {
    user?: {
        id: number;
    }
}

export default function isAuthenticated(
  request: IRequest,
  response: Response,
  next: NextFunction
): void {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new AppError(
        401, 
        'Not found', 
        'Token ausente');
  }

  try {
    const decoded = verify(token, authConfig.jwt.secret) as { sub: string };
    request.user = { id: Number(decoded.sub) };

    next();
  } catch {
    throw new AppError(
        401, 
        'Not found', 
        'Token inválido');
  }
}
