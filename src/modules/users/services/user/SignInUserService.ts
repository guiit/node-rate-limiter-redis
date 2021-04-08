import bcrypt from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';
import { ISignInUserDTO } from '@modules/users/dtos/IUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IResponse {
  auth: boolean;
  token: string;
}

@injectable()
export class SignInUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(
    credentials: ISignInUserDTO
  ): Promise<IResponse | undefined> {
    const { email, password } = credentials;
    const user = await this.userRepository.isEmailRegistered(email);

    if (!user) throw new AppError('Email or password is incorrect!');

    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched)
      throw new AppError('Email or password is incorrect!');

    const token = sign(
      { id: user.user_id, role: user.user_type },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: 86400
      }
    );

    return { auth: true, token };
  }
}
