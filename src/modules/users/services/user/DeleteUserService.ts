import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IGetUserDTO } from '@modules/users/dtos/IUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';

@injectable()
export class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ user_id }: IGetUserDTO): Promise<User | undefined> {
    const userExists = await this.userRepository.findOne({ user_id });
    if (!userExists) throw new AppError('User does not exist!');

    const user = await this.userRepository.delete(userExists);

    return user;
  }
}
