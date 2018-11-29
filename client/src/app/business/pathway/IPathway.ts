import { IModule } from '../module/IModule';

export interface IPathway {
  /**
   *
   * @type {string}
   * @memberof Pathway
   */
  userId: string;
  /**
   *
   * @type {Array}
   * @memberof Pathway
   */
  modules?: IModule[];
}
