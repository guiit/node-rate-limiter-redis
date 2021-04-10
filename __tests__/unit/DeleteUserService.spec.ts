import AppError from '@shared/errors/AppError';
import { connection } from '../index';
import { DeleteUserService } from '@modules/users/services/user/DeleteUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';

let userRepository: UserRepository,
  deleteUserService: DeleteUserService,
  userCreated: User;

const userSchema = {
  name: 'any_name',
  password: 'any_password',
  confirmPassword: 'any_password',
  email: 'any_email@email.com',
  cpf: '501.841.201-99'
};

describe('Should validate delete user service', () => {
  beforeAll(async () => {
    await connection.create();
  });
  beforeEach(async () => {
    userRepository = new UserRepository();
    deleteUserService = new DeleteUserService(userRepository);

    userCreated = await userRepository.create(userSchema);
  });
  afterEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });

  test('Should throws if user does not exist', async () => {
    const promise = deleteUserService.execute({
      user_id: 'c64e8c2d-e41f-4471-849e-72e7911dac21'
    });
    await expect(promise).rejects.toEqual(new AppError('User does not exist!'));
  });

  test('Should call findOne method with correct param', async () => {
    const findOneSpy = jest.spyOn(userRepository, 'findOne');
    await deleteUserService.execute({
      user_id: userCreated.user_id
    });
    expect(findOneSpy).toHaveBeenCalledWith({ user_id: userCreated.user_id });
  });

  test('Should call delete method with correct param', async () => {
    const deleteSpy = jest.spyOn(userRepository, 'delete');
    const findOneSpy = jest.spyOn(userRepository, 'findOne');

    await deleteUserService.execute({
      user_id: userCreated.user_id
    });
    expect(deleteSpy).toHaveBeenCalledWith(
      await findOneSpy.mock.results[0].value
    );
  });

  test('Should return user with correct values', async () => {
    const {
      name,
      cpf,
      email,
      is_active,
      phone,
      created_at,
      updated_at
    } = userCreated;
    const user = await deleteUserService.execute({
      user_id: userCreated.user_id
    });

    expect(user).toEqual({
      user_id: undefined,
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
