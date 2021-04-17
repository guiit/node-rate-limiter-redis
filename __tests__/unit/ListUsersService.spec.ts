import { connection } from '../index';
import { ListUsersService } from '@modules/users/services/user/ListUsersService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';

let userRepository: UserRepository,
  listUsersService: ListUsersService,
  userCreated: User;

const userSchema = {
  name: 'any_name',
  password: 'any_password',
  confirmPassword: 'any_password',
  email: 'any_email@email.com',
  cpf: '501.841.201-99'
};

describe('Should validate list users service', () => {
  beforeAll(async () => {
    await connection.create();
  });
  beforeEach(async () => {
    userRepository = new UserRepository();
    listUsersService = new ListUsersService(userRepository);

    userCreated = await userRepository.create(userSchema);
  });
  afterEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });

  test('Should call findAll method with correct param', async () => {
    const findAllSpy = jest.spyOn(userRepository, 'findAll');
    await listUsersService.execute({
      take: 1,
      skip: 1
    });
    expect(findAllSpy).toHaveBeenCalledWith({ take: 1, skip: 1 });
  });

  test('Should return user with correct values', async () => {
    const {
      user_id,
      name,
      cpf,
      email,
      is_active,
      phone,
      created_at,
      updated_at
    } = userCreated;
    const user = await listUsersService.execute({});

    expect(user[0]).toEqual({
      user_id,
      name,
      cpf,
      email,
      phone,
      is_active,
      created_at,
      updated_at
    });
  });
});
