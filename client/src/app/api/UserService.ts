import { JsonServiceBase, Middleware } from 'app/api/JsonServiceBase';
import { IResultMessage, IActionResult } from 'common/actions';
import { User, UserApiFetchParamCreator, JwtToken } from './mapper/swagger/typescript-fetch-client';
import { IUserService, Credentials } from 'app/business/user/IUserService';
import { IUser } from 'app/business/user/USer';

export class UserService extends JsonServiceBase<User> implements IUserService {

  constructor(endpoint: string, config: RequestInit, middlewares: Array<Middleware>) {
    super(endpoint, middlewares, { ...config, headers: { 'Content-Type': 'application/json' } });
  }

  signIn: (credentials: Credentials) => Promise<IUser> = (credentials) => {
    const params = UserApiFetchParamCreator().usersSigninPost(credentials);
    return this.fetch<JwtToken>(params.url, params.options).then((userWithToken: JwtToken) => {
      return { ...userWithToken, token: userWithToken.token };
    });
  }

  read: (id: string) => Promise<IUser> = (id) => {
    const params = UserApiFetchParamCreator().usersIdGet(id);
    return this.fetch<User>(params.url, params.options);
  }
}
