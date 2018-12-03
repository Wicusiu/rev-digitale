import { Entity, model, property } from '@loopback/repository';

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
  last_authenticated_date?: string;

  @property({
    type: 'string',
  })
  photo?: string;

  @property({
    type: 'boolean',
  })
  is_admin?: boolean;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
