import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UserService from '@modules/users/services/UserService';

const userService = container.resolve(UserService);

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const isUserCreated = await userService.create(request.body);
    return response.status(201).json({ isUserCreated });
  }

  async get(request: Request, response: Response): Promise<Response> {
    const user = await userService.get(request.params.user_id);
    return response.status(200).json(user);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const users = await userService.list(request.query);
    return response.status(200).json(users);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const isUserUpdated = await userService.update(
      request.params.user_id,
      request.body
    );
    return response.status(200).json({ isUserUpdated });
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const isUserDeleted = await userService.delete(request.params.user_id);
    return response.status(200).json({ isUserDeleted });
  }

  async signIn(request: Request, response: Response): Promise<Response> {
    const authentication = await userService.signIn(request.body);
    return response.status(200).json(authentication);
  }
}

export default new UserController();
