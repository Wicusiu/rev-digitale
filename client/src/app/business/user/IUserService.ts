import { IUser } from './User';

export interface Credentials {
  email: string
  password: string
}

export interface IUserService {
  signIn: (credentials: Credentials) => Promise<IUser>;
}
