import { DefaultCrudRepository, juggler, repository, BelongsToAccessor } from '@loopback/repository';
import { Module, Brick } from '../models';
import { RevolutionDigitaleDBDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { BrickRepository } from './brick.repository';

export class ModuleRepository extends DefaultCrudRepository<
  Module,
  typeof Module.prototype.id
  > {

  public readonly brick: BelongsToAccessor<
    Brick,
    typeof Module.prototype.brickId
    >;

  constructor(
    @inject('datasources.RevolutionDigitaleDB') dataSource: RevolutionDigitaleDBDataSource,
    @repository.getter('BrickRepository') brickRepositoryGetter: Getter<BrickRepository>
  ) {
    super(Module, dataSource);
    this.brick = this._createBelongsToAccessorFor(
      'brick',
      brickRepositoryGetter,
    );
  }
}
