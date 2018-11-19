import { merge } from "lodash";
export type Middleware = (res: AxiosResponse) => Promise<AxiosResponse>

import axios, { AxiosResponse, AxiosRequestConfig } from 'axios' 

export const makeJWTConfig =function(jwt : string){
  return {headers :{ Authorization: `Bearer ${jwt}` }}
}

export  const connectMiddleWares = function(dispatch, unconnectedMiddlewares : Array<(dispatch , res: AxiosResponse)=>Promise<Response>>) : Array<Middleware>{
  return unconnectedMiddlewares.map((mid)=>{
      return mid.bind(mid,dispatch)
  })
}

export const applyMiddleWares = (funcs: Array<Middleware>, responseInit : AxiosResponse) => {
  return funcs.reduce((promise, func) =>
    promise.then(result => func(result).then((res) => {
      return Object.assign(result, res);
    })),
    Promise.resolve(responseInit))
}

type SupportedHttpMethod = 'POST' | 'GET' | 'DELETE' | 'PUT'

const FECTH_CONFIG_BASE = (method: SupportedHttpMethod , data?: any): AxiosRequestConfig => {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    data: data ? JSON.stringify(data) : undefined,
  }
}

const GET_FECTH_CONFIG = (): AxiosRequestConfig => { return FECTH_CONFIG_BASE('GET'); }
const POST_FECTH_CONFIG = (data: any, header?: HeadersInit): AxiosRequestConfig => { return FECTH_CONFIG_BASE('POST', data) }
const PUT_FECTH_CONFIG = (): AxiosRequestConfig => { return FECTH_CONFIG_BASE('PUT'); }
const DELETE_FECTH_CONFIG = (): AxiosRequestConfig => { return FECTH_CONFIG_BASE('DELETE'); }


export abstract class JsonServiceBase<T>{
  constructor(private endpoint : string,private middleWares?: Array<(response : AxiosResponse) => Promise<any>>, private fetchConfig: AxiosRequestConfig = {}) {
  }

  protected Fetch<T>(url: string, params: any): Promise<T> {
    const newConfig = merge(params, this.fetchConfig);
    if(newConfig.body) 
      newConfig.data = newConfig.body

    return axios(`${this.endpoint}${url}`, newConfig).then((results: AxiosResponse<T>) => {
      return applyMiddleWares(this.middleWares, results)
    }).then((response)=>{
      return response.data
    })
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