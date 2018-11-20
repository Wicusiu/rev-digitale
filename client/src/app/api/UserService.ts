import { JsonServiceBase, Middleware } from 'app/api/JsonServiceBase';
import { IResultMessage, IActionResult } from 'common/actions';
import { User, UserApiFetchParamCreator } from './mapper/swagger/typescript-fetch-client';
import { IUserService, Credentials } from 'app/business/user/IUserService';
import { IUser } from 'app/business/user/USer';

export class UserService extends JsonServiceBase<User> implements IUserService {

  constructor(endpoint: string, config: RequestInit, middlewares: Array<Middleware>) {
    super(endpoint, middlewares, config);
  }

  signIn: (credentials: Credentials) => Promise<IUser> = (credentials) => {
    return null;
  }
}
