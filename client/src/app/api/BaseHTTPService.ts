/**
 * Rewrite JsonServiceBase using axios instead of fetch
 */

/*
export type Middleware = (res: Response) => Promise<Response>

export const makeJWTConfig = function (jwt: string) {
  return { headers: { Authorization: `Bearer ${jwt}` } };
};

export const connectMiddleWares =
  function (dispatch,
            unconnectedMiddlewares: ((dispatch, res: Response) => Promise<Response>)[]): Middleware[] {
    return unconnectedMiddlewares.map((mid) => {
      return mid.bind(mid, dispatch);
    });
  };

export const applyMiddleWares = (funcs: Middleware[], responseInit: Response) => {
  return funcs.reduce((promise, func) =>
      promise.then(result => func(result).then((res) => {
        return Object.assign(result, res);
      })),
    Promise.resolve(responseInit));
};

type SupportedHttpMethod = 'POST' | 'GET' | 'DELETE' | 'PUT';

const FECTH_CONFIG_BASE = (method: SupportedHttpMethod, data?: any): RequestInit => {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  };

};

const GET_FECTH_CONFIG = (): RequestInit => {
  return FECTH_CONFIG_BASE('GET');
};
const POST_FECTH_CONFIG = (data: any, header?: HeadersInit): RequestInit => {
  return FECTH_CONFIG_BASE('POST', data);
};
const PUT_FECTH_CONFIG = (): RequestInit => {
  return FECTH_CONFIG_BASE('PUT');
};
const DELETE_FECTH_CONFIG = (): RequestInit => {
  return FECTH_CONFIG_BASE('DELETE');
};


export abstract class JsonServiceBase<T> {
  constructor(
    private endpoint: string,
    private middleWares?: ((response: Response) => Promise<any>)[],
    private fetchConfig: RequestInit = {}) {
  }

  protected Fetch<T>(url: string, params: RequestInit): Promise<T> {
    const newConfig = Object.assign(params, this.fetchConfig);
    return fetch(this.endpoint + url, newConfig).then((results) => {
      return applyMiddleWares(this.middleWares, results);
    }).then((res) => {
      return res.json();
    });
  }

  protected GetMethod<T>(url: string): Promise<T> {
    return this.Fetch<T>(url, GET_FECTH_CONFIG());
  }

  protected PostMethod<T>(url: string, payLoad: any): Promise<T> {
    return this.Fetch<T>(url, POST_FECTH_CONFIG(payLoad));
  }

  protected PutMethod<T>(url: string, payLoad: any): Promise<T> {
    return this.Fetch<T>(url, PUT_FECTH_CONFIG());
  }

  protected DeleteMethod<T>(url: string): Promise<T> {
    return this.Fetch<T>(url, DELETE_FECTH_CONFIG());
  }
}
*/import { JsonServiceBase } from './JsonServiceBase';
