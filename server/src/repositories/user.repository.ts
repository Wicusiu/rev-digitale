import { Repository, juggler, Entity, DefaultCrudRepository } from '@loopback/repository';
import { RevolutionDigitaleDBDataSource } from '../datasources';
import { inject } from '@loopback/core';
import { User } from '../models/user.model';
import { runInThisContext } from 'vm';

import * as jwt from 'jsonwebtoken';
import { secretKey } from '../config';

export class UserRepository extends DefaultCrudRepository<User, string> {

  constructor(
    @inject('datasources.RevolutionDigitaleDB') dataSource: RevolutionDigitaleDBDataSource,
  ) {
    super(User, dataSource);
  }

  async findByToken(token: string): Promise<User> {
    // Query DS
    const user = await this.modelClass.findOne({ where: { token: { eq: token } } });

    // Check if user exists
    if (user == null) {
      return Promise.reject("User not found");
    }

    return Promise.resolve(this.toEntity(user));
  }

  async findByEmail(email: string): Promise<User> {
    // Query DS
    const user = await this.modelClass.findOne({ where: { email: { eq: email } } });

    // Check if user exists
    if (user == null) {
      return Promise.reject("User not found");
    }

    return Promise.resolve(this.toEntity(user));
  }
}
