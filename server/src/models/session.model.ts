import {Entity, model, property} from '@loopback/repository';

@model()
export class Session extends Entity {
  @property({
    type: 'number',
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
  date: string;

  constructor(data?: Partial<Session>) {
    super(data);
  }
}
