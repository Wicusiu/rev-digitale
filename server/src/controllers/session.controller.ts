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
import { Session, Module } from '../models';
import { SessionRepository } from '../repositories';

import * as ical from 'ical-generator';
import * as moment from 'moment';

const upCal = ical({ domain: 'outlook.office.com', name: 'Up Calendar' });

export class SessionController {
  constructor(
    @repository(SessionRepository)
    public sessionRepository: SessionRepository,
  ) { }

  @post('/sessions', {
    responses: {
      '200': {
        description: 'Session model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Session } } },
      },
    },
  })
  async create(@requestBody() session: Session): Promise<Session> {
    return await this.sessionRepository.create(session);
  }

  @get('/sessions/count', {
    responses: {
      '200': {
        description: 'Session model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Session)) where?: Where,
  ): Promise<Count> {
    return await this.sessionRepository.count(where);
  }

  @get('/sessions', {
    responses: {
      '200': {
        description: 'Array of Session model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Session } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Session)) filter?: Filter,
  ): Promise<Session[]> {
    return await this.sessionRepository.find(filter);
  }

  @patch('/sessions', {
    responses: {
      '200': {
        description: 'Session PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() session: Session,
    @param.query.object('where', getWhereSchemaFor(Session)) where?: Where,
  ): Promise<Count> {
    return await this.sessionRepository.updateAll(session, where);
  }

  @get('/sessions/{id}', {
    responses: {
      '200': {
        description: 'Session model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Session } } },
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Session> {
    return await this.sessionRepository.findById(id);
  }

  @get('/sessions/ics/{id}', {
    responses: {
      '200': {
        description: 'ICal Data Event for a given session',
        content: { 'text/calendar': { schema: { 'x-ts-type': ical.ICalEvent } } },
      },
    },
  })
  async getICS(@param.path.string('id') id: string): Promise<ical.ICalEvent> {
    const session = await this.sessionRepository.findById(id);
    return upCal.createEvent({
      start: session.date,
      end: moment().add(1, 'hour'),
      stamp: moment(),
      summary: 'My Event',
      organizer: 'Sebastian Pekarek <mail@example.com>'
    });
  }

  @patch('/sessions/{id}', {
    responses: {
      '204': {
        description: 'Session PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() session: Session,
  ): Promise<void> {
    await this.sessionRepository.updateById(id, session);
  }

  @del('/sessions/{id}', {
    responses: {
      '204': {
        description: 'Session DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sessionRepository.deleteById(id);
  }

  @get('/sessions/{id}/module')
  async getModule(
    @param.path.string('id') sessionId: typeof Module.prototype.id,
  ): Promise<Module> {
    return await this.sessionRepository.module(sessionId);
  }
}
