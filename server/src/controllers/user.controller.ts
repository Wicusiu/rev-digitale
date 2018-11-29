import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  property,
  model,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import { User } from '../models';
import { UserRepository } from '../repositories';
import { createCredentials } from 'crypto';
import { secretKey } from '../config';

import * as jwt from 'jsonwebtoken'
import { authenticate } from '@loopback/authentication';

@model()
export class UserCredentials {
  @property({
    type: 'string',
    required: true,
  })
  email: string;
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

@model()
export class JwtToken {
  @property({
    type: User,
  })
  user: User;
  @property({
    type: 'string',
    required: true,
  })
  token: string;
}

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @authenticate('BearerStrategy')
  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  async create(@requestBody() user: User): Promise<User> {
    return await this.userRepository.create(user);
  }

  @post('/users/signin', {
    responses: {
      '200': {
        description: 'User authenticated',
        content: { 'application/json': { schema: { 'x-ts-type': JwtToken } } },
      },
      '403': {
        description: 'User not authenticated',
        content: { 'application/json': { schema: { 'x-ts-type': "" } } },
      }
    },
  })
  async signIn(@requestBody() credentials: UserCredentials): Promise<JwtToken> {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (user.password === credentials.password) {
      // Generate a new JWT token
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {
          last_name: user.last_name,
          first_name: user.first_name,
          email: user.email,
        }
      }, secretKey);
      return Promise.resolve({
        token,
        user,
      });
    }
    throw new HttpErrors[403]('User not authenticated');
  }

  @authenticate('BearerStrategy')
  @get('/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.count(where);
  }

  // @authenticate('BearerStrategy')
  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': User } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter,
  ): Promise<User[]> {
    return await this.userRepository.find(filter);
  }

  @authenticate('BearerStrategy')
  @patch('/users', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() user: User,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.userRepository.updateAll(user, where);
  }

  @authenticate('BearerStrategy')
  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  @authenticate('BearerStrategy')
  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @authenticate('BearerStrategy')
  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
