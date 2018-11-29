import { EventPayload, IResultMessage, ACTION_STATUS } from 'common/actions';
import { Session } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { ISessionService } from '../ISessionService';

export type GetByUserSessionEventPayload = EventPayload<Array<Session>>;
export const GET_BY_USER_SESSION_EVENT = 'GET_BY_USER_SESSION_EVENT';

const getByUserEventCreator = (status: ACTION_STATUS, aggregate?: Array<Session>, messages?: Array<IResultMessage>): Action<GetByUserSessionEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: GET_BY_USER_SESSION_EVENT,
});

export const getByUser = function (sessionService: ISessionService, id: string, filter?: string) {
  return async (dispatch) => {
    dispatch(getByUserEventCreator('PENDING'));
    return sessionService.getByUserId(id).then((sessions: Array<Session>) => {
      dispatch(getByUserEventCreator('SUCCESS', sessions));
      return sessions;
    }).catch((error) => {
      dispatch(getByUserEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
