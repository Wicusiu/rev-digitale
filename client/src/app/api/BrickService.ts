import { JsonServiceBase, Middleware } from 'app/api/JsonServiceBase';
import { IResultMessage, IActionResult } from 'common/actions';
import { Brick, BrickApiFetchParamCreator } from './mapper/swagger/typescript-fetch-client';
import { IBrickService } from 'app/business/brick/IBrickService';

export class BrickService extends JsonServiceBase<Brick> implements IBrickService {

  constructor(endpoint: string, config: RequestInit, middlewares: Array<Middleware>) {
    super(endpoint, middlewares, { ...config, headers: { 'Content-Type': 'application/json' } });
  }

  read(id: string): Promise<Brick> {
    const params = BrickApiFetchParamCreator().brickFindById(id);
    return this.fetch<Brick>(params.url, params.options);
  }

  count(): Promise<number> {
    const params = BrickApiFetchParamCreator().brickCount();
    return this.fetch<number>(params.url, params.options);
  }

  add(args: Brick): Promise<IActionResult<Brick>> {
    const params = BrickApiFetchParamCreator().brickCreate(args);
    return this.fetch<Brick>(params.url, params.options).then((brick: Brick) => {
      return {
        succeeded: true,
        entity: brick,
      } as IActionResult<Brick>;
    });
  }

  update(args: Brick): Promise<IActionResult<Brick>> {
    const params = BrickApiFetchParamCreator().brickPatchOrCreate(args);
    return this.fetch<Brick>(params.url, params.options).then((brick: Brick) => {
      return {
        succeeded: true,
        entity: brick,
      } as IActionResult<Brick>;
    });
  }

  delete(id: string): Promise<IActionResult<string>> {
    const params = BrickApiFetchParamCreator().brickDeleteById(id);
    return this.fetch<void>(params.url, params.options).then(() => {
      return {
        succeeded: true,
        entity: id,
      } as IActionResult<string>;
    });
  }

  all(): Promise<Array<Brick>> {
    const params = BrickApiFetchParamCreator().brickFind();
    return this.fetch<Array<Brick>>(params.url, params.options);
  }
}
