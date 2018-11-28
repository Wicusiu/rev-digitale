import { ISessionService } from '../ISessionService';
import { EventPayload, ACTION_STATUS, IResultMessage, IActionResult } from 'common/actions';
import { Session, NewSession } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';

export type AddSessionEventPayload = EventPayload<Session>;
export const ADD_SESSION_EVENT = 'ADD_SESSION_EVENT';

const addEventCreator = (status: ACTION_STATUS, aggregate?: Session, messages?: Array<IResultMessage>): Action<AddSessionEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: ADD_SESSION_EVENT,
});

export const add = function (sessionService: ISessionService, args: NewSession) {
  return async (dispatch) => {
    dispatch(addEventCreator('PENDING'));
    return sessionService.add(args).then((entityAddResult: IActionResult<Session>) => {
      dispatch(addEventCreator('SUCCESS', entityAddResult.entity));
      return entityAddResult;
    }).catch((error) => {
      dispatch(addEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
