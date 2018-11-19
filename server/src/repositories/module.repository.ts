import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Module} from '../models';
import {RevolutionDigitaleDBDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ModuleRepository extends DefaultCrudRepository<
  Module,
  typeof Module.prototype.id
> {
  constructor(
    @inject('datasources.RevolutionDigitaleDB') dataSource: RevolutionDigitaleDBDataSource,
  ) {
    super(Module, dataSource);
  }
}
