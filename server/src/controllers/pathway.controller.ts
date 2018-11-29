import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
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
} from '@loopback/rest';
import { Pathway, Module } from '../models';
import { PathwayRepository } from '../repositories';

import { authenticate } from '@loopback/authentication';

export class PathwayController {
  constructor(
    @repository(PathwayRepository)
    public pathwayRepository: PathwayRepository,
  ) { }

  @authenticate('BearerStrategy')
  @post('/pathways', {
    responses: {
      '200': {
        description: 'Pathway model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Pathway } } },
      },
    },
  })
  async create(@requestBody() pathway: Partial<Pathway>): Promise<Pathway> {
    return await this.pathwayRepository.create(pathway);
  }

  @authenticate('BearerStrategy')
  @get('/pathways/count', {
    responses: {
      '200': {
        description: 'Pathway model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Pathway)) where?: Where,
  ): Promise<Count> {
    return await this.pathwayRepository.count(where);
  }

  @authenticate('BearerStrategy')
  @get('/pathways', {
    responses: {
      '200': {
        description: 'Array of Pathway model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Pathway } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Pathway)) filter?: Filter,
  ): Promise<Pathway[]> {
    return await this.pathwayRepository.find(filter);
  }

  @authenticate('BearerStrategy')
  @get('/pathways/{userId}', {
    responses: {
      '200': {
        description: 'Pathway model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Pathway } } },
      },
    },
  })
  async findById(@param.path.string('userId') userId: string): Promise<Pathway> {
    return await this.pathwayRepository.findById(userId);
  }

  @authenticate('BearerStrategy')
  @patch('/pathways/{userId}', {
    responses: {
      '204': {
        description: 'Pathway PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('userId') userId: string,
    @requestBody() pathway: Pathway,
  ): Promise<void> {
    await this.pathwayRepository.updateById(userId, pathway);
  }

  @authenticate('BearerStrategy')
  @del('/pathways/{userId}', {
    responses: {
      '204': {
        description: 'Pathway DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('userId') userId: string): Promise<void> {
    await this.pathwayRepository.deleteById(userId);
  }
}
