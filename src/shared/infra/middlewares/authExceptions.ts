import { Request, Response, NextFunction } from 'express';

export function authExceptions(auth: Function) {
  return function (request: Request, response: Response, next: NextFunction) {
    const signInEndPoint =
      request.path === '/users/sign-in' && request.method === 'POST';

    if (signInEndPoint) {
      next();
    } else {
      auth(request, response, next);
    }
  };
}
