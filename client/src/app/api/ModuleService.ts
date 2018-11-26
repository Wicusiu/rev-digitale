import { JsonServiceBase, Middleware } from 'app/api/JsonServiceBase';
import { IResultMessage, IActionResult } from 'common/actions';
import { Module, ModuleApiFetchParamCreator } from './mapper/swagger/typescript-fetch-client';
import { IModuleService } from 'app/business/module/IModuleService';

export class ModuleService extends JsonServiceBase<Module> implements IModuleService {

  constructor(endpoint: string, config: RequestInit, middlewares: Array<Middleware>) {
    super(endpoint, middlewares, config);
  }

  read(id: string): Promise<Module> {
    const params = ModuleApiFetchParamCreator().moduleFindById(id);
    return this.fetch<Module>(params.url, params.options);
  }

  count(): Promise<number> {
    const params = ModuleApiFetchParamCreator().moduleCount();
    return this.fetch<number>(params.url, params.options);
  }

  add(args: Module): Promise<IActionResult<Module>> {
    const params = ModuleApiFetchParamCreator().moduleCreate(args);
    return this.fetch<Module>(params.url, params.options).then((module: Module) => {
      return {
        succeeded: true,
        entity: module,
      } as IActionResult<Module>;
    });
  }

  update(args: Module): Promise<IActionResult<Module>> {
    const params = ModuleApiFetchParamCreator().modulePatchOrCreate(args);
    return this.fetch<Module>(params.url, params.options).then((module: Module) => {
      return {
        succeeded: true,
        entity: module,
      } as IActionResult<Module>;
    });
  }

  delete(id: string): Promise<IActionResult<string>> {
    const params = ModuleApiFetchParamCreator().moduleDeleteById(id);
    return this.fetch<void>(params.url, params.options).then(() => {
      return {
        succeeded: true,
        entity: id,
      } as IActionResult<string>;
    });
  }

  all(): Promise<Array<Module>> {
    const params = ModuleApiFetchParamCreator().moduleFind();
    return this.fetch<Array<Module>>(params.url, params.options);
  }

  getByBrickId(brickId: string): Promise<Module[]> {
    const params = ModuleApiFetchParamCreator().moduleGetByBrick(brickId);
    return this.fetch<Array<Module>>(params.url, params.options);
  }
}
