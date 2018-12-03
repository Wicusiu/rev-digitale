import { juggler } from '@loopback/service-proxy';
import { OAUTH_TOKEN_URL } from '../config';

const auth_datasource: juggler.DataSource = new juggler.DataSource({
  name: 'Auth',
  connector: 'rest',
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'POST',
        url: OAUTH_TOKEN_URL,
        query: {
          address: '{street},{city},{zipcode}',
          sensor: '{sensor=false}',
        },
        responsePath: '$.results',
      },
    },
  ],
});
export default auth_datasource;
