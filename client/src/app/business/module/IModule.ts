import { Session, Brick, AttendeeParticipationStatus } from 'app/api/mapper/swagger/typescript-fetch-client';

export interface IModule {
  /**
     *
     * @type {string}
     * @memberof Module
     */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof Module
   */
  description: string;
  /**
   *
   * @type {string}
   * @memberof Module
   */
  logo: string;
  /**
   *
   * @type {string}
   * @memberof Module
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Module
   */
  brick?: Brick;
  /**
     *
     * @type {Attendee}
     * @memberof Pathway
     */
  sessionAttendee?: Session
}

export interface ISessionAttendee {
  /**
   *
   * @type {string}
   * @memberof Attendee
   */
  comment?: string;
  /**
   *
   * @type {string}
   * @memberof Attendee
   */
  rating?: number;
  /**
   *
   * @type {Session}
   * @memberof ISessionAttendee
   */
  session?: Session;
  /**
   *
   * @type {AttendeeParticipationStatus}
   * @memberof ISessionAttendee
   */
  status?: AttendeeParticipationStatus;
}
