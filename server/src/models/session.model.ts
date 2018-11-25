import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Module } from './module.model';

@model()
export class Session extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: Date;

  @property({
    type: 'string',
    required: true,
  })
  start: string;

  @property({
    type: 'string',
    required: true,
  })
  end: string;

  @belongsTo(() => Module)
  moduleId: string

  constructor(data?: Partial<Session>) {
    super(data);
  }
}
