import { JsonServiceBase, Middleware } from 'app/api/JsonServiceBase';
import { IResultMessage, IActionResult } from 'common/actions';
import { Session, SessionApiFetchParamCreator } from './mapper/swagger/typescript-fetch-client';
import { ISessionService } from 'app/business/session/ISessionService';

export class SessionService extends JsonServiceBase<Session> implements ISessionService {

  constructor(endpoint: string, config: RequestInit, middlewares: Array<Middleware>) {
    super(endpoint, middlewares, config);
  }

  read(id: string): Promise<Session> {
    const params = SessionApiFetchParamCreator().sessionFindById(id);
    return this.fetch<Session>(params.url, params.options);
  }

  count(): Promise<number> {
    const params = SessionApiFetchParamCreator().sessionCount();
    return this.fetch<number>(params.url, params.options);
  }

  add(args: Session): Promise<IActionResult<Session>> {
    const params = SessionApiFetchParamCreator().sessionCreate(args);
    return this.fetch<Session>(params.url, params.options).then((session: Session) => {
      return {
        succeeded: true,
        entity: session,
      } as IActionResult<Session>;
    });
  }

  update(args: Session): Promise<IActionResult<Session>> {
    const params = SessionApiFetchParamCreator().sessionPatchOrCreate(args);
    return this.fetch<Session>(params.url, params.options).then((session: Session) => {
      return {
        succeeded: true,
        entity: session,
      } as IActionResult<Session>;
    });
  }

  delete(id: string): Promise<IActionResult<string>> {
    const params = SessionApiFetchParamCreator().sessionDeleteById(id);
    return this.fetch<void>(params.url, params.options).then(() => {
      return {
        succeeded: true,
        entity: id,
      } as IActionResult<string>;
    });
  }

  all(): Promise<Array<Session>> {
    const params = SessionApiFetchParamCreator().sessionFind();
    return this.fetch<Array<Session>>(params.url, params.options);
  }
}
