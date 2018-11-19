import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Brique} from '../models';
import {RevolutionDigitaleDBDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BriqueRepository extends DefaultCrudRepository<
  Brique,
  typeof Brique.prototype.id
> {
  constructor(
    @inject('datasources.RevolutionDigitaleDB') dataSource: RevolutionDigitaleDBDataSource,
  ) {
    super(Brique, dataSource);
  }
}
