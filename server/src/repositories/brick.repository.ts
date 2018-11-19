import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Brick } from '../models';
import { RevolutionDigitaleDBDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class BrickRepository extends DefaultCrudRepository<
  Brick,
  typeof Brick.prototype.id
  > {
  constructor(
    @inject('datasources.RevolutionDigitaleDB') dataSource: RevolutionDigitaleDBDataSource,
  ) {
    super(Brick, dataSource);
  }
}
