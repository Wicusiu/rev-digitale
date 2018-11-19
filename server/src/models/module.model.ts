import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Brick } from './brick.model';

@model()
export class Module extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @belongsTo(() => Brick)
  brickId: string;

  constructor(data?: Partial<Module>) {
    super(data);
  }
}
