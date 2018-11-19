import { DefaultCrudRepository, juggler, BelongsToAccessor, repository } from '@loopback/repository';
import { Session, Module } from '../models';
import { RevolutionDigitaleDBDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { ModuleRepository } from './module.repository';

export class SessionRepository extends DefaultCrudRepository<
  Session,
  typeof Session.prototype.id
  > {

  public readonly module: BelongsToAccessor<
    Module,
    typeof Session.prototype.moduleId
    >;

  constructor(
    @inject('datasources.RevolutionDigitaleDB') dataSource: RevolutionDigitaleDBDataSource,
    @repository.getter('ModuleRepository') moduleRepositoryGetter: Getter<ModuleRepository>,
  ) {
    super(Session, dataSource);
    this.module = this._createBelongsToAccessorFor(
      'module',
      moduleRepositoryGetter,
    );
  }
}
