import { Entity, model, property, hasMany } from '@loopback/repository';
import { Module } from './module.model';

@model()
export class Brick extends Entity {
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

  @hasMany(() => Module)
  modules?: Module[];

  constructor(data?: Partial<Brick>) {
    super(data);
  }
}
