import { Entity, model, property, belongsTo } from '@loopback/repository';
import { truncateSync } from 'fs';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  last_name?: string;

  @property({
    type: 'string',
    required: true,
  })
  first_name?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
