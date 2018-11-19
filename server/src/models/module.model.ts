import { Entity, model, property, belongsTo, hasMany } from '@loopback/repository';
import { Brick } from './brick.model';
import { Session } from './session.model';

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

  @hasMany(() => Session)
  sessions?: Session[];

  constructor(data?: Partial<Module>) {
    super(data);
  }
}
