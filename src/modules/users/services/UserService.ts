import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import {
  ICreateUser,
  IListUser,
  ISignInUser,
  IUpdateUser
} from '@modules/users/dtos/IUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IResponse {
  token: string;
}

@injectable()
export default class UserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async create(data: ICreateUser): Promise<boolean> {
    console.log('ijk');
    const emailExists = await this.userRepository.findByEmail(data.email);
    if (emailExists)
      throw new AppError('E-mail already belongs to another user!');

    if (data.cpf) {
      const cpfExists = await this.userRepository.findByCpf(data.cpf);
      if (cpfExists) throw new AppError('CPF already belongs to another user!');
    }
    data.password = bcrypt.hashSync(data.password, 8);

    return await this.userRepository.create(data);
  }

  async get(user_id: string): Promise<User> {
    return await this.userRepository.findOneOrFail(user_id);
  }

  async list(query: IListUser): Promise<User[]> {
    return await this.userRepository.find(query);
  }
  async update(user_id: string, data: IUpdateUser): Promise<boolean> {
    const userExists = await this.userRepository.findOneOrFail(user_id);

    if (data.email) {
      if (data.email !== userExists.email) {
        const emailExists = await this.userRepository.findByEmail(data.email);
        if (emailExists)
          throw new AppError('This email already belongs to another user!');
      }
    }
    if (data.cpf) {
      if (data.cpf !== userExists.cpf) {
        const cpfExists = await this.userRepository.findByCpf(data.cpf);
        if (cpfExists)
          throw new AppError('This cpf already belongs to another user!');
      }
    }
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 8);
    }

    delete data.confirmPassword;

    return await this.userRepository.update(
      Object.assign({}, userExists, data)
    );
  }

  async delete(user_id: string): Promise<boolean> {
    await this.userRepository.findOneOrFail(user_id);
    return await this.userRepository.delete(user_id);
  }

  async signIn(credentials: ISignInUser): Promise<IResponse> {
    const { email, password } = credentials;
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError('Email or password is incorrect!');

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword)
      throw new AppError('Email or password is incorrect!');

    const token = sign({ id: user.user_id }, `${process.env.JWT_SECRET}`, {
      expiresIn: 86400
    });

    return { token };
  }
}
