import { verify, decode } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

export default function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const bearerToken = request.header('Authorization');
  if (!bearerToken)
    throw new AppError('Access denied! It is required to have a token!');

  const secret = `${process.env.JWT_SECRET}`;

  const token = bearerToken.replace('Bearer ', '');

  const isValidToken = verify(token, secret);

  if (!isValidToken) throw new AppError('Invalid token!');

  const obj = decode(token);

  if (obj) {
    request.user = {
      role: obj['role'],
      user_id: obj['user_id']
    };
  }

  next();
}
