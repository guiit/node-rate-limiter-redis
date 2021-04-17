import AppError from '@shared/errors/AppError';
import { connection } from '../index';
import { GetUserService } from '@modules/users/services/user/GetUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';

let userRepository: UserRepository,
  getUserService: GetUserService,
  userCreated: User;

const userSchema = {
  name: 'any_name',
  password: 'any_password',
  confirmPassword: 'any_password',
  email: 'any_email@email.com',
  cpf: '501.841.201-99'
};

describe('Should validate get user service', () => {
  beforeAll(async () => {
    await connection.create();
  });
  beforeEach(async () => {
    userRepository = new UserRepository();
    getUserService = new GetUserService(userRepository);

    userCreated = await userRepository.create(userSchema);
  });
  afterEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });

  test('Should throws if user does not exist', async () => {
    const promise = getUserService.execute({
      user_id: 'c64e8c2d-e41f-4471-849e-72e7911dac21'
    });
    await expect(promise).rejects.toEqual(new AppError('User does not exist!'));
  });

  test('Should call findOne method with correct param', async () => {
    const findOneSpy = jest.spyOn(userRepository, 'findOne');
    await getUserService.execute({
      user_id: userCreated.user_id
    });
    expect(findOneSpy).toHaveBeenCalledWith({ user_id: userCreated.user_id });
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
    const user = await getUserService.execute({
      user_id: userCreated.user_id
    });

    expect(user).toEqual({
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
