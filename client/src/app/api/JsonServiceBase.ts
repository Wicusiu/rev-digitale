import { merge } from 'lodash';
import { IResultMessage } from 'common/actions';
export type Middleware = (res: Response) => Promise<Response>;

export const makeJWTConfig = function (jwt: string) {
  return jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : { headers: {} };
};

export const connectMiddleWares = function (dispatch, unconnectedMiddlewares: Array<(dispatch, res: Response) => Promise<Response>>): Array<Middleware> {
  return unconnectedMiddlewares.map((mid) => {
    return mid.bind(mid, dispatch);
  });
};

export const applyMiddleWares = (funcs: Array<Middleware>, responseInit: Response) => {
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

const GET_FECTH_CONFIG = (): RequestInit => { return FECTH_CONFIG_BASE('GET'); };
const POST_FECTH_CONFIG = (data: any, header?: HeadersInit): RequestInit => { return FECTH_CONFIG_BASE('POST', data); };
const PUT_FECTH_CONFIG = (): RequestInit => { return FECTH_CONFIG_BASE('PUT'); };
const DELETE_FECTH_CONFIG = (): RequestInit => { return FECTH_CONFIG_BASE('DELETE'); };

export abstract class JsonServiceBase<T>{
  constructor(private endpoint: string, private middleWares?: Array<(response: Response) => Promise<any>>, private fetchConfig: RequestInit = {}) {
  }

  protected async fetch<T>(url: string, params: RequestInit): Promise<T> {
    const newConfig = merge(params, this.fetchConfig, { headers: { 'Content-Type': 'application/json' } });
    try {
      return fetch(this.endpoint + url, newConfig).then((results) => {
        return applyMiddleWares(this.middleWares, results);
      }).then((response) => {
        return response.text().then((text) => {
          return text ? JSON.parse(text) : {};
        });
      }).catch((error) => {
        if (error.message === 'Failed to fetch' || error.message === 'Network request failed') {
          const resultMessages = new Array<IResultMessage>();
          resultMessages.push({ intent: 'error', message: 'Veuillez vérifier votre connexion internet' });
          return Promise.reject(resultMessages);
        }

        return Promise.reject(error);
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected getMethod<T>(url: string): Promise<T> {
    return this.fetch<T>(url, GET_FECTH_CONFIG());
  }

  protected postMethod<T>(url: string, payLoad: any): Promise<T> {
    return this.fetch<T>(url, POST_FECTH_CONFIG(payLoad));
  }

  protected putMethod<T>(url: string, payLoad: any): Promise<T> {
    return this.fetch<T>(url, PUT_FECTH_CONFIG());
  }

  protected deleteMethod<T>(url: string): Promise<T> {
    return this.fetch<T>(url, DELETE_FECTH_CONFIG());
  }
}
