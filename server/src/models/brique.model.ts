import {Entity, model, property} from '@loopback/repository';

@model()
export class Brique extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

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
  description: string;

  @property({
    type: 'string',
  })
  logo?: string;

  @property({
    type: 'date',
  })
  createdDate?: string;

  @property({
    type: 'date',
    required: true,
  })
  modifiedDate: string;

  constructor(data?: Partial<Brique>) {
    super(data);
  }
}
