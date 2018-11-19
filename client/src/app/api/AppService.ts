import { JsonServiceBase, Middleware } from 'app/api/JsonServiceBase';
import { IResultMessage } from 'common/actions';

export class AppService extends JsonServiceBase<IResultMessage> {

  constructor(endpoint: string, config: RequestInit, middlewares: Array<Middleware>) {
    super(endpoint, middlewares, config);
  }

  pushMessage(args: any) : Promise<string> {
    // const params = AppInfoApiFetchParamCreator().appInfoPushMessage(args);
    // return this.Fetch<string>(params.url, params.options);
    return null;
  }
}
