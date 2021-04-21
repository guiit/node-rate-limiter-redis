import { getRepository, Repository } from 'typeorm';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { ICreateUser, IListUser } from '@modules/users/dtos/IUserDTO';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create(body: ICreateUser): Promise<boolean> {
    const userInstance = this.ormRepository.create(body);
    return (await this.ormRepository.save(userInstance)) ? true : false;
  }

  async find(query: IListUser): Promise<User[]> {
    return await this.ormRepository.find(query);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({ email });
  }

  async findByCpf(cpf: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({ cpf });
  }

  async findOneOrFail(id: string): Promise<User> {
    return await this.ormRepository.findOneOrFail(id);
  }

  async update(user: User): Promise<boolean> {
    return (await this.ormRepository.save(user)) ? true : false;
  }

  async delete(user_id: string): Promise<boolean> {
    return (await this.ormRepository.delete({ user_id })).affected
      ? true
      : false;
  }
}
