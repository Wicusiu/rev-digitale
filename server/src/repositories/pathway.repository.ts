import { DefaultCrudRepository, juggler, BelongsToAccessor, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { Pathway, Module } from '../models';
import { RevolutionDigitaleDBDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { ModuleRepository } from './module.repository';

export class PathwayRepository extends DefaultCrudRepository<
  Pathway,
  typeof Pathway.prototype.userId
  > {

  constructor(
    @inject('datasources.RevolutionDigitaleDB') dataSource: RevolutionDigitaleDBDataSource
  ) {
    super(Pathway, dataSource);
  }
}
