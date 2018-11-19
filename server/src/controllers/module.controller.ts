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
import {Module} from '../models';
import {ModuleRepository} from '../repositories';

export class ModuleController {
  constructor(
    @repository(ModuleRepository)
    public moduleRepository : ModuleRepository,
  ) {}

  @post('/modules', {
    responses: {
      '200': {
        description: 'Module model instance',
        content: {'application/json': {schema: {'x-ts-type': Module}}},
      },
    },
  })
  async create(@requestBody() module: Module): Promise<Module> {
    return await this.moduleRepository.create(module);
  }

  @get('/modules/count', {
    responses: {
      '200': {
        description: 'Module model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Module)) where?: Where,
  ): Promise<Count> {
    return await this.moduleRepository.count(where);
  }

  @get('/modules', {
    responses: {
      '200': {
        description: 'Array of Module model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Module}},
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

  @patch('/modules', {
    responses: {
      '200': {
        description: 'Module PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() module: Module,
    @param.query.object('where', getWhereSchemaFor(Module)) where?: Where,
  ): Promise<Count> {
    return await this.moduleRepository.updateAll(module, where);
  }

  @get('/modules/{id}', {
    responses: {
      '200': {
        description: 'Module model instance',
        content: {'application/json': {schema: {'x-ts-type': Module}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Module> {
    return await this.moduleRepository.findById(id);
  }

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
}
