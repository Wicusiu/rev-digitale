import { Entity, model, property, hasMany } from '@loopback/repository';

@model({
  settings: {
    strictObjectIDCoercion: true,
  }
})
export class Pathway extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  userId: string;

  @property.array(String)
  moduleIds: Array<string>;

  constructor(data?: Partial<Pathway>) {
    super(data);
  }
}
