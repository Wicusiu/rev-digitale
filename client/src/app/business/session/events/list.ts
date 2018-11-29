import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Session } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { ISessionService } from '../ISessionService';

export type ListSessionEventPayload = EventPayload<Array<Session>>;
export const LIST_SESSION_EVENT = 'LIST_SESSION_EVENT';

const listEventCreator = (status: ACTION_STATUS, aggregate?: Array<Session>, messages?: Array<IResultMessage>): Action<ListSessionEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: LIST_SESSION_EVENT,
});

export const list = function (sessionService: ISessionService, filters?: string) {
  return async (dispatch) => {
    dispatch(listEventCreator('PENDING'));
    return sessionService.all(filters).then((sessions: Array<Session>) => {
      dispatch(listEventCreator('SUCCESS', sessions));
      return sessions;
    }).catch((error) => {
      dispatch(listEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
