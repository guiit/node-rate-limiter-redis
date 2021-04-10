import AppError from '@shared/errors/AppError';
import bcrypt from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
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
    data.password = bcrypt.hashSync(data.password, 8);

    const user = await this.userRepository.create(data);

    return user;
  }
}
