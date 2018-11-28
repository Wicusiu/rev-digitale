import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Module } from './module.model';
import { IdDefinition } from 'loopback-datasource-juggler';

@model({
  settings: {
    strictObjectIDCoercion: true,
  }
})
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
    type: 'string',
  })
  location?: string;

  @property({
    type: 'date',
    required: true,
  })
  startDate: Date;

  @property({
    type: 'string',
    required: true,
  })
  endDate: Date;

  @belongsTo(() => Module)
  moduleId: string

  constructor(data?: Partial<Session>) {
    super(data);
  }
}
