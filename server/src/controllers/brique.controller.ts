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
import {Brique} from '../models';
import {BriqueRepository} from '../repositories';

export class BriqueController {
  constructor(
    @repository(BriqueRepository)
    public briqueRepository : BriqueRepository,
  ) {}

  @post('/briques', {
    responses: {
      '200': {
        description: 'Brique model instance',
        content: {'application/json': {schema: {'x-ts-type': Brique}}},
      },
    },
  })
  async create(@requestBody() brique: Brique): Promise<Brique> {
    return await this.briqueRepository.create(brique);
  }

  @get('/briques/count', {
    responses: {
      '200': {
        description: 'Brique model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Brique)) where?: Where,
  ): Promise<Count> {
    return await this.briqueRepository.count(where);
  }

  @get('/briques', {
    responses: {
      '200': {
        description: 'Array of Brique model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Brique}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Brique)) filter?: Filter,
  ): Promise<Brique[]> {
    return await this.briqueRepository.find(filter);
  }

  @patch('/briques', {
    responses: {
      '200': {
        description: 'Brique PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() brique: Brique,
    @param.query.object('where', getWhereSchemaFor(Brique)) where?: Where,
  ): Promise<Count> {
    return await this.briqueRepository.updateAll(brique, where);
  }

  @get('/briques/{id}', {
    responses: {
      '200': {
        description: 'Brique model instance',
        content: {'application/json': {schema: {'x-ts-type': Brique}}},
      },
    },
  })
  async findById(@param.path.number('id') id: string): Promise<Brique> {
    return await this.briqueRepository.findById(id);
  }

  @patch('/briques/{id}', {
    responses: {
      '204': {
        description: 'Brique PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() brique: Brique,
  ): Promise<void> {
    await this.briqueRepository.updateById(id, brique);
  }

  @del('/briques/{id}', {
    responses: {
      '204': {
        description: 'Brique DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.briqueRepository.deleteById(id);
  }
}
