import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  ICreateUserDTO,
  IGetUserDTO,
  IListUsersDTO
} from '@modules/users/dtos/IUserDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  update(userEntity: User): Promise<User>;
  delete(userEntity: User): Promise<User>;
  findOne({ user_id }: IGetUserDTO): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAll(query: IListUsersDTO): Promise<User[]>;
}
