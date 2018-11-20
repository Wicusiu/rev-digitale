// src/providers/auth-strategy.provider.ts
import { Provider, inject, ValueOrPromise, Getter } from '@loopback/context';
import { Strategy } from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { UserRepository } from '../repositories/user.repository';
import { repository } from '@loopback/repository';
import { User } from '../models';

import * as jwt from 'jsonwebtoken'
import { secretKey } from '../config';

export type UserPayload = {
  exp: number;
  data: {
    email: string;
    last_name: string;
    first_name: string;
  }
}

export class DefaultAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA)
    private metadata: AuthenticationMetadata,
    @repository(UserRepository)
    private userRepository: UserRepository,
  ) {

  }

  value = (): ValueOrPromise<Strategy | undefined> => {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'BearerStrategy') {
      return new BearerStrategy(this.verify.bind(null, this.userRepository));
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }

  verify = (userRepository: UserRepository, token: string, cb: (err: Error | null, user?: User | false) => void) => {
    try {
      // Check token
      jwt.verify(token, secretKey, function (err, decoded) {
        if (err) {
          /*
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: 1408621000
            }
          */
          cb(null, false);
        } else {
          // find user by name & password
          const payload = decoded as UserPayload;
          userRepository.findByEmail(payload.data.email).then((user: User) => {
            if (user == null) {
              cb(null, false);
            } else {
              cb(null, user);
            }
          }).catch(() => {
            cb(null, false);
          });
        }
      });
    } catch (error) {
      cb(null, false);
    }
  }
}
