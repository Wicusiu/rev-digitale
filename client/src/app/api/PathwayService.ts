import { JsonServiceBase, Middleware } from 'app/api/JsonServiceBase';
import { IActionResult } from 'common/actions';
import { Session, Pathway, PathwayApiFetchParamCreator, NewPathway, ModuleApiFetchParamCreator, Module, BrickApiFetchParamCreator, Brick, SessionApiFetchParamCreator } from './mapper/swagger/typescript-fetch-client';
import { IPathwayService } from 'app/business/pathway/IPathwayService';
import { Filter } from '../../../typings/query';
import { IPathway } from 'app/business/pathway/IPathway';
import { IModule } from 'app/business/module/IModule';

export class PathwayService extends JsonServiceBase<Pathway> implements IPathwayService {

  constructor(endpoint: string, config: RequestInit, middlewares: Array<Middleware>) {
    super(endpoint, middlewares, config);
  }

  read(id: string): Promise<IPathway> {
    const params = PathwayApiFetchParamCreator().pathwayFindById(id);
    return this.fetch<Pathway>(params.url, params.options).then((pathway: Pathway) => {
      /*const filter: Filter<Module> = {
        include: [{ relation: Brick }],
      };*/
      const filter: Filter<Module> = {};
      const params = ModuleApiFetchParamCreator().moduleFind(JSON.stringify(filter));
      return this.fetch<Array<Module>>(params.url, params.options).then((modules: Module[]) => {
        const params = BrickApiFetchParamCreator().brickFind();
        return this.fetch<Array<Brick>>(params.url, params.options).then((bricks: Brick[]) => {
          const params = SessionApiFetchParamCreator().sessionGetByUser(id);
          return this.fetch<Array<Session>>(params.url, params.options).then((sessions: Session[]) => {
            return Promise.resolve({
              ...pathway,
              modules: modules.filter(mod => pathway.moduleIds.includes(mod.id)).map((mod: Module) => {
                return {
                  ...mod,
                  brick: bricks.find(b => b.id === mod.brickId),
                  sessionAttendee: sessions.find(ses => ses.moduleId === mod.id),
                } as IModule;
              }),
            });
          });
        });
      });
    });
  }

  count(): Promise<number> {
    const params = PathwayApiFetchParamCreator().pathwayCount();
    return this.fetch<number>(params.url, params.options);
  }

  add(args: NewPathway): Promise<IActionResult<Pathway>> {
    const params = PathwayApiFetchParamCreator().pathwayCreate(args);
    return this.fetch<Pathway>(params.url, params.options).then((pathway: Pathway) => {
      return {
        succeeded: true,
        entity: pathway,
      } as IActionResult<Pathway>;
    });
  }

  update(args: Pathway): Promise<IActionResult<Pathway>> {
    const params = PathwayApiFetchParamCreator().pathwayPatchOrCreate(args);
    return this.fetch<Pathway>(params.url, params.options).then((pathway: Pathway) => {
      return {
        succeeded: true,
        entity: pathway,
      } as IActionResult<Pathway>;
    });
  }

  delete(id: string): Promise<IActionResult<string>> {
    const params = PathwayApiFetchParamCreator().pathwayDeleteById(id);
    return this.fetch<void>(params.url, params.options).then(() => {
      return {
        succeeded: true,
        entity: id,
      } as IActionResult<string>;
    });
  }

  all(filters?: string): Promise<Array<Pathway>> {
    const params = PathwayApiFetchParamCreator().pathwayFind(filters);
    return this.fetch<Array<Pathway>>(params.url, params.options);
  }
}
