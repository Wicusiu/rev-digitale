import { ICRUDService } from 'common/service/ICRUDService';
import { Module } from 'app/api/mapper/swagger/typescript-fetch-client';

export interface IModuleService extends ICRUDService<Module, string> {
  getByBrickId: (brickId: string) => Promise<Array<Module>>;
}
