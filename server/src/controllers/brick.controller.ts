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
import { Brick, Module } from '../models';
import { BrickRepository } from '../repositories';

export class BrickController {
  constructor(
    @repository(BrickRepository)
    public brickRepository: BrickRepository,
  ) { }

  @post('/bricks', {
    responses: {
      '200': {
        description: 'Brick model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Brick } } },
      },
    },
  })
  async create(@requestBody() brick: Brick): Promise<Brick> {
    return await this.brickRepository.create(brick);
  }

  @get('/bricks/count', {
    responses: {
      '200': {
        description: 'Brick model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Brick)) where?: Where,
  ): Promise<Count> {
    return await this.brickRepository.count(where);
  }

  @get('/bricks', {
    responses: {
      '200': {
        description: 'Array of Brick model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Brick } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Brick)) filter?: Filter,
  ): Promise<Brick[]> {
    return await this.brickRepository.find(filter);
  }

  @patch('/bricks', {
    responses: {
      '200': {
        description: 'Brick PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() brick: Brick,
    @param.query.object('where', getWhereSchemaFor(Brick)) where?: Where,
  ): Promise<Count> {
    return await this.brickRepository.updateAll(brick, where);
  }

  @get('/bricks/{id}', {
    responses: {
      '200': {
        description: 'Brick model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Brick } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Brick> {
    return await this.brickRepository.findById(id);
  }

  @get('/bricks/{id}/modules', {
    responses: {
      '200': {
        description: 'Brick modules',
        content: { 'application/json': { schema: { 'x-ts-type': Brick } } },
      },
    },
  })
  async getModules(@param.path.string('id') id: string): Promise<Array<Module>> {
    return await this.brickRepository.modules(id).find();
  }

  @patch('/bricks/{id}', {
    responses: {
      '204': {
        description: 'Brick PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() brick: Brick,
  ): Promise<void> {
    await this.brickRepository.updateById(id, brick);
  }

  @del('/bricks/{id}', {
    responses: {
      '204': {
        description: 'Brick DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.brickRepository.deleteById(id);
  }

  @post('/bricks/{id}/module')
  async createModule(
    @param.path.string('id') brickId: typeof Brick.prototype.id,
    @requestBody() moduleData: Module,
  ): Promise<Module> {
    return await this.brickRepository.modules(brickId).create(moduleData);
  }
}
