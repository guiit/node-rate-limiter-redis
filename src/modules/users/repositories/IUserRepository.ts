import { User } from '@modules/users/infra/typeorm/entities/User';
import { IListUser, ICreateUser } from '@modules/users/dtos/IUserDTO';
import { IBase } from '@shared/repositories/IBaseRepository';

export default interface IUserRepository extends IBase<User, ICreateUser> {
  find(query: IListUser): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findByCpf(cpf: string): Promise<User | undefined>;
}
