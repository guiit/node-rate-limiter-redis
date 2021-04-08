import AppError from '@shared/errors/AppError';
import { connection } from '../index';
import { UserRole } from '@modules/users/infra/typeorm/entities/User';
import { CreateUserService } from '@modules/users/services/user/CreateUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
const userSchema = {
  name: 'any_name',
  password: 'any_password',
  confirmPassword: 'any_password',
  email: 'any_email@email.com',
  user_type: UserRole.ADMIN,
  cpf: '501.841.201-99'
};
describe('Should validate create user service', () => {
  beforeAll(async () => {
    await connection.create();
  });
  beforeEach(async () => {
    const userRepository = new UserRepository();
    await userRepository.create(userSchema);
  });
  afterEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });

  test('Should throws if e-mail already exists', async () => {
    const userRepository = new UserRepository();

    const createUserService = new CreateUserService(userRepository);

    const promise = createUserService.execute({ ...userSchema });
    await expect(promise).rejects.toEqual(
      new AppError('E-mail already belongs to another user!')
    );
  });
  test('Should throws if cpf already exists', async () => {
    const userRepository = new UserRepository();

    const createUserService = new CreateUserService(userRepository);

    const promise = createUserService.execute(
      Object.assign({}, userSchema, { email: 'another_email' })
    );
    await expect(promise).rejects.toEqual(
      new AppError('CPF already belongs to another user!')
    );
  });

  test('Should not call findByCpf method if cpf is not informed', async () => {
    const userRepository = new UserRepository();

    const findByCpfSpy = jest.spyOn(userRepository, 'findByCpf');
    const createUserService = new CreateUserService(userRepository);
    const data = Object.assign({}, userSchema, {
      email: 'another_email',
      cpf: undefined
    });
    await createUserService.execute(data);
    expect(findByCpfSpy).not.toHaveBeenCalled();
  });
  test('Should return user values returned by create method', async () => {
    const userRepository = new UserRepository();

    const createSpyOn = jest.spyOn(userRepository, 'create');
    const createUserService = new CreateUserService(userRepository);
    const data = Object.assign({}, userSchema, {
      email: 'another_email',
      cpf: '12345678912345'
    });
    const user = await createUserService.execute(data);
    expect(user).toEqual(await createSpyOn.mock.results[0].value);
  });
});
