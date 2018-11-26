import { ISessionService } from '../ISessionService';
import { EventPayload, ACTION_STATUS, IResultMessage, IActionResult } from 'common/actions';
import { Session } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';

export type ReadSessionEventPayload = EventPayload<Session>;
export const READ_SESSION_EVENT = 'READ_SESSION_EVENT';

const readEventCreator = (status: ACTION_STATUS, aggregate?: Session, messages?: Array<IResultMessage>): Action<ReadSessionEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: READ_SESSION_EVENT,
});

export const read = function (sessionService: ISessionService, id: string) {
  return async (dispatch) => {
    dispatch(readEventCreator('PENDING'));
    return sessionService.read(id).then((session: Session) => {
      dispatch(readEventCreator('SUCCESS', session));
      return session;
    }).catch((error) => {
      dispatch(readEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
