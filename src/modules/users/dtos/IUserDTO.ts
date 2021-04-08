import { UserRole } from '@modules/users/infra/typeorm/entities/User';

export {
  ICreateUserDTO,
  IUpdateUserDTO,
  IGetUserDTO,
  IListUsersDTO,
  ISignInUserDTO
};

interface ICreateUserDTO {
  name: string;
  user_type: UserRole;
  phone?: string;
  cpf?: string;
  email: string;
  password: string;
  confirmPassword: string;
  is_active?: boolean;
}

interface IUpdateUserDTO {
  name?: string;
  user_type?: UserRole;
  phone?: string;
  cpf?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  is_active?: boolean;
}

interface IGetUserDTO {
  user_id: string;
}

interface IListUsersDTO {
  take?: number;
  skip?: number;
}

interface ISignInUserDTO {
  email: string;
  password: string;
}
