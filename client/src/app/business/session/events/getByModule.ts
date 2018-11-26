import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Module, Session } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { ISessionService } from '../ISessionService';

export type GetByModuleSessionEventPayload = EventPayload<Array<Session>>;
export const GET_BY_MODULE_SESSION_EVENT = 'GET_BY_MODULE_SESSION_EVENT';

const getByModuleEventCreator = (status: ACTION_STATUS, aggregate?: Array<Session>, messages?: Array<IResultMessage>): Action<GetByModuleSessionEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: GET_BY_MODULE_SESSION_EVENT,
});

export const getByModule = function (sessionService: ISessionService, id: string, filter?: string) {
  return async (dispatch) => {
    dispatch(getByModuleEventCreator('PENDING'));
    return sessionService.getByModuleId(id).then((sessions: Array<Session>) => {
      dispatch(getByModuleEventCreator('SUCCESS', sessions));
      return sessions;
    }).catch((error) => {
      dispatch(getByModuleEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
