import { getRepository, Repository } from 'typeorm';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';
import {
  ICreateUserDTO,
  IGetUserDTO,
  IListUsersDTO
} from '@modules/users/dtos/IUserDTO';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const userInstance = this.ormRepository.create(data);
    const user = await this.ormRepository.save(userInstance);
    return user;
  }

  public async update(userEntity: User): Promise<User> {
    const user = await this.ormRepository.save(userEntity);

    return user;
  }

  public async delete(userEntity: User): Promise<User> {
    const user = await this.ormRepository.remove(userEntity);

    return user;
  }

  public async findOne({ user_id }: IGetUserDTO): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(user_id);

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ cpf });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(
      { email },
      { select: ['user_id', 'password'] }
    );

    return user;
  }
  public async findAll(query: IListUsersDTO): Promise<User[]> {
    const users = await this.ormRepository.find(query);

    return users;
  }
}
