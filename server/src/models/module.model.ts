import {Entity, model, property} from '@loopback/repository';

@model()
export class Module extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  constructor(data?: Partial<Module>) {
    super(data);
  }
}
