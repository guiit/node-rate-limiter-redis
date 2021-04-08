import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { ICreateUserDTO } from '@modules/users/dtos/IUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(data: ICreateUserDTO): Promise<User | undefined> {
    const emailExists = await this.userRepository.findByEmail(data.email);
    if (emailExists)
      throw new AppError('E-mail already belongs to another user!');

    if (data.cpf) {
      const cpfExists = await this.userRepository.findByCpf(data.cpf);
      if (cpfExists) throw new AppError('CPF already belongs to another user!');
    }

    const user = await this.userRepository.create(data);

    return user;
  }
}
