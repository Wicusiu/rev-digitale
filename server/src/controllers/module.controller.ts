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
import { Module, Brick } from '../models';
import { ModuleRepository } from '../repositories';
import { authenticate } from '@loopback/authentication';

export class ModuleController {
  constructor(
    @repository(ModuleRepository)
    public moduleRepository: ModuleRepository,
  ) { }

  @authenticate('BearerStrategy')
  @post('/modules', {
    responses: {
      '200': {
        description: 'Module model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Module } } },
      },
    },
  })
  async create(@requestBody() module: Module): Promise<Module> {
    return await this.moduleRepository.create(module);
  }

  @authenticate('BearerStrategy')
  @get('/modules/count', {
    responses: {
      '200': {
        description: 'Module model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Module)) where?: Where,
  ): Promise<Count> {
    return await this.moduleRepository.count(where);
  }

  @authenticate('BearerStrategy')
  @get('/modules', {
    responses: {
      '200': {
        description: 'Array of Module model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Module } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Module)) filter?: Filter,
  ): Promise<Module[]> {
    return await this.moduleRepository.find(filter);
  }

  @authenticate('BearerStrategy')
  @get('/modules/byBrick/{id}', {
    responses: {
      '200': {
        description: 'Array of Module model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Module } },
          },
        },
      },
      '404': {
        description: 'Ressource not found',
        content: {
          'application/json': {
            schema: { message: typeof ('string') },
          },
        },
      },
    },
  })
  async getByBrickId(
    @param.path.string('id') id: string,
  ): Promise<Module[]> {
    const brickFilter: Filter = { where: { brickId: id } };
    return await this.moduleRepository.find(brickFilter);
  }

  @authenticate('BearerStrategy')
  @patch('/modules', {
    responses: {
      '200': {
        description: 'Module PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() module: Module,
    @param.query.object('where', getWhereSchemaFor(Module)) where?: Where,
  ): Promise<Count> {
    return await this.moduleRepository.updateAll(module, where);
  }

  @authenticate('BearerStrategy')
  @get('/modules/{id}', {
    responses: {
      '200': {
        description: 'Module model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Module } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Module> {
    return await this.moduleRepository.findById(id);
  }

  @authenticate('BearerStrategy')
  @patch('/modules/{id}', {
    responses: {
      '204': {
        description: 'Module PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() module: Module,
  ): Promise<void> {
    await this.moduleRepository.updateById(id, module);
  }

  @authenticate('BearerStrategy')
  @del('/modules/{id}', {
    responses: {
      '204': {
        description: 'Module DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.moduleRepository.deleteById(id);
  }

  @authenticate('BearerStrategy')
  @get('/modules/{id}/brick')
  async getBrick(
    @param.path.string('id') moduleId: typeof Module.prototype.id,
  ): Promise<Brick> {
    return await this.moduleRepository.brick(moduleId);
  }
}
