import { DefaultCrudRepository, juggler, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { Brick, Module } from '../models';
import { RevolutionDigitaleDBDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { ModuleRepository } from './module.repository';

export class BrickRepository extends DefaultCrudRepository<
  Brick,
  typeof Brick.prototype.id
  > {

  public readonly modules: HasManyRepositoryFactory<
    Module,
    typeof Brick.prototype.id
    >;

  constructor(
    @inject('datasources.RevolutionDigitaleDB') dataSource: RevolutionDigitaleDBDataSource,
    @repository.getter('ModuleRepository') getModuleRepository: Getter<ModuleRepository>,
  ) {
    super(Brick, dataSource);
    this.modules = this._createHasManyRepositoryFactoryFor(
      'modules',
      getModuleRepository,
    );
  }
}
