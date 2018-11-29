
import { ISessionService } from '../ISessionService';
import { EventPayload, ACTION_STATUS, IResultMessage, IActionResult } from 'common/actions';
import { Session } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';

export type RegisterSessionEventPayload = EventPayload<Session>;
export const REGISTER_SESSION_EVENT = 'REGISTER_SESSION_EVENT';

const registerEventCreator = (status: ACTION_STATUS, aggregate?: Session, messages?: Array<IResultMessage>): Action<RegisterSessionEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: REGISTER_SESSION_EVENT,
});

export const register = function (sessionService: ISessionService, userId: string, sessionId: string) {
  return async (dispatch) => {
    dispatch(registerEventCreator('PENDING'));
    return sessionService.register(userId, sessionId).then((entityRegisterResult: IActionResult<Session>) => {
      dispatch(registerEventCreator('SUCCESS', entityRegisterResult.entity));
      return entityRegisterResult;
    }).catch((error) => {
      dispatch(registerEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
