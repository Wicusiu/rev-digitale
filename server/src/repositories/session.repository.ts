import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Session} from '../models';
import {RevolutionDigitaleDBDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SessionRepository extends DefaultCrudRepository<
  Session,
  typeof Session.prototype.id
> {
  constructor(
    @inject('datasources.RevolutionDigitaleDB') dataSource: RevolutionDigitaleDBDataSource,
  ) {
    super(Session, dataSource);
  }
}
