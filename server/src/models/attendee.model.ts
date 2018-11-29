import { model, property, ValueObject } from "@loopback/repository";

@model()
export class Attendee extends ValueObject {
  @property({
    type: 'string',
    required: true,
  })
  userId?: string;

  @property({
    type: 'object',
  })
  status?: AttendeeParticipationStatus;

  @property({
    type: 'string',
  })
  comment?: string;

  @property({
    type: 'number',
  })
  rating?: number;

  constructor(data?: Partial<Attendee>) {
    super(data);
  }
}

export enum AttendeeParticipationStatus {
  Planned,
  Participated,
  Declined,
  Missed,
}
