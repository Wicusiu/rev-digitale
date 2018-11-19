import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './revolution-digitale-db.datasource.json';

export class RevolutionDigitaleDBDataSource extends juggler.DataSource {
  static dataSourceName = 'RevolutionDigitaleDB';

  constructor(
    @inject('datasources.config.RevolutionDigitaleDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
