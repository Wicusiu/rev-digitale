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
  HttpErrors,
} from '@loopback/rest';
import { Session, Module } from '../models';
import { SessionRepository } from '../repositories';

import * as ical from 'ical-generator';
import * as moment from 'moment';
import { authenticate } from '@loopback/authentication';
import { AttendeeParticipationStatus, Attendee } from '../models/attendee.model';

const upCal = ical({ domain: 'outlook.office.com', name: 'Up Calendar' });

export class SessionController {
  constructor(
    @repository(SessionRepository)
    public sessionRepository: SessionRepository,
  ) { }

  @authenticate('BearerStrategy')
  @post('/sessions', {
    responses: {
      '200': {
        description: 'Session model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Session } } },
      },
    },
  })
  async create(@requestBody() session: Partial<Session>): Promise<Session> {
    return await this.sessionRepository.create(session);
  }

  @authenticate('BearerStrategy')
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

  @authenticate('BearerStrategy')
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

  @authenticate('BearerStrategy')
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

  @authenticate('BearerStrategy')
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

  @authenticate('BearerStrategy')
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
      start: session.startDate,
      end: session.endDate,
      stamp: moment(),
      summary: 'My Event',
      organizer: 'Sebastian Pekarek <mail@example.com>'
    });
  }

  @authenticate('BearerStrategy')
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

  @authenticate('BearerStrategy')
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

  @authenticate('BearerStrategy')
  @get('/sessions/{id}/module')
  async getModule(
    @param.path.string('id') sessionId: typeof Module.prototype.id,
  ): Promise<Module> {
    return await this.sessionRepository.module(sessionId);
  }

  @authenticate('BearerStrategy')
  @get('/sessions/byModule/{id}', {
    responses: {
      '200': {
        description: 'Array of Session model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Session } },
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
  async getByModuleId(
    @param.path.string('id') id: string,
  ): Promise<Session[]> {
    const sessionFilter: Filter = { where: { moduleId: id } };
    return await this.sessionRepository.find(sessionFilter);
  }

  @authenticate('BearerStrategy')
  @get('/sessions/byUser/{id}', {
    responses: {
      '200': {
        description: 'Array of Session model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Session } },
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
  async getByUserId(
    @param.path.string('id') id: string,
  ): Promise<Session[]> {
    const sessions = await this.sessionRepository.find();
    return Promise.resolve(sessions.filter(s => s.attendees != null && s.attendees.some(a => a.userId === id)));
  }

  @authenticate('BearerStrategy')
  @post('/sessions/register', {
    responses: {
      '200': {
        description: 'Array of Session model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Session } },
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
  async register(
    @requestBody() registration: {
      userId: string,
      sessionId: string,
    },
  ): Promise<Session> {
    const session = await this.sessionRepository.findById(registration.sessionId);
    if (session == null) {
      throw new HttpErrors.NotFound('Aucune session correspondante');
    }
    if (session.attendees && session.attendees.find(a => a.userId === registration.userId) != null) {
      throw new HttpErrors.NotAcceptable('Vous êtes déjà inscrit à cette session');
    }
    const otherSessions = await this.sessionRepository.find({
      where: {
        moduleId: { eq: session.moduleId },
        id: { neq: session.id },
      }
    });
    let alreadyRegisteredInOtherSession: boolean = false;
    otherSessions.forEach((otherSession) => {
      alreadyRegisteredInOtherSession
        = alreadyRegisteredInOtherSession || (otherSession.attendees && otherSession.attendees.find(a => a.userId === registration.userId) != null);
    });

    if (alreadyRegisteredInOtherSession) {
      throw new HttpErrors.NotAcceptable('Vous êtes déjà inscrit dans une autre session du module');
    }

    if (session.attendees == null) {
      session.attendees = [];
    }
    session.attendees.push(new Attendee({
      userId: registration.userId,
      status: AttendeeParticipationStatus.Planned,
    }));

    this.sessionRepository.update(session);

    return Promise.resolve(session);
  }
}
