export { ICreateUser, IUpdateUser, IListUser, ISignInUser };

interface ICreateUser {
  name: string;
  phone?: string;
  cpf?: string;
  email: string;
  password: string;
  confirmPassword: string;
  is_active?: boolean;
}

interface IUpdateUser {
  name?: string;
  phone?: string;
  cpf?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  is_active?: boolean;
}

interface IListUser {
  take?: number;
  skip?: number;
}

interface ISignInUser {
  email: string;
  password: string;
}
