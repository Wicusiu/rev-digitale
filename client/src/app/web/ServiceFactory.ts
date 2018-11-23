import { JsonServiceBase } from 'app/api/JsonServiceBase';
import { Dispatch } from 'react-redux';
import { BASE_URL } from 'app/config';
import { makeJWTConfig } from 'app/api/AxiosServiceBase';
import { apiMiddleware } from 'app/api/ApiMiddlewares';

export const ServiceFactory = {
  create<T extends JsonServiceBase<any>>(serviceClass: new (baseUrl: string, token: any, dispatch: any) => T, dispatch: Dispatch<any>, token: string) {
    if (token == null) {
      return new serviceClass(BASE_URL, {}, apiMiddleware(dispatch));
    }

    return new serviceClass(BASE_URL, makeJWTConfig(token), apiMiddleware(dispatch));
  },
};
