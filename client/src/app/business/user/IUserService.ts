import { IUser } from './User';

export interface Credentials {
  email: string
  password: string
}

export interface AuthCredentials {
  code: string;
  redirect_uri: string;
}

export interface IUserService {
  authSignIn: (credentials: AuthCredentials) => Promise<IUser>;
  signIn: (credentials: Credentials) => Promise<IUser>;
  read: (id: string) => Promise<IUser>;
}
