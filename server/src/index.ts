import { RevolutionDigitaleApplication } from './application';
import { ApplicationConfig } from '@loopback/core';

export { RevolutionDigitaleApplication };

export async function main(options: ApplicationConfig = {}) {
  const appConfig = {
    rest: {
      apiExplorer: {
        disabled: true,
      },
      openApiSpec: {
        servers: [{ url: 'http://127.0.0.1:3000' }],
        setServersFromRequest: false,
        endpointMapping: {
          '/openapi.json': { version: '3.0.0', format: 'json' },
          '/openapi.yaml': { version: '3.0.0', format: 'yaml' },
        },
      },
    }
  };

  const app = new RevolutionDigitaleApplication({ ...appConfig, options });
  await app.boot();
  await app.start();

  const url = 'http://127.0.0.1:3000';
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
