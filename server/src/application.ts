import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import { AppSequence } from './sequence';
import * as path from 'path';

import { RestExplorerComponent } from '@loopback/rest-explorer';
import { AuthenticationComponent, AuthenticationBindings } from '@loopback/authentication';
import { DefaultAuthStrategyProvider } from './providers/auth-strategy.provider';

export class RevolutionDigitaleApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.component(RestExplorerComponent);

    this.component(AuthenticationComponent);
    this.bind(AuthenticationBindings.STRATEGY).toProvider(
      DefaultAuthStrategyProvider,
    );

    // Set up the custom sequence
    this.sequence(AppSequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../../public'));

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
