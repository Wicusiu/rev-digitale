const fs = require('fs');
const path = require('path');
const request = require('request');
const unzip = require('unzip2');

const codeGenEndpoint = 'http://generator.swagger.io/api/gen/clients';
const swaggerEndpoint = 'http://localhost:3000/openapi.json';

const language = 'typescript-fetch';

request.get({
  'rejectUnauthorized': false,
  url: swaggerEndpoint,
}, function (error, response, body) {
  if (error) {
    throw error;
  }

  const swaggerObj = JSON.parse(body);

  const postBody = {
    spec: swaggerObj,
    options: {
      modelPropertyNaming: 'camelCase',
      apiPackage: 'api.clients.settings',
      modelPackage: 'api.clients.settings'
    }
  };

  request.post({
    'rejectUnauthorized': false,
    url: codeGenEndpoint + '/' + language,
    body: JSON.stringify(postBody),
    headers: {
      'Content-Type': 'application/json'
    }
  }, function (error, response, body) {
    if (error) {
      throw error;
    }

    if (response.statusCode !== 200) {
      throw new Error('Response code was not 200. ' + body);
    }

    const responseObj = JSON.parse(body);

    request({
      'rejectUnauthorized': false,
      url: responseObj.link,
      encoding: null
    }).pipe(unzip.Extract({
      path: 'src/app/api/mapper/swagger'
    }));
  });
});
