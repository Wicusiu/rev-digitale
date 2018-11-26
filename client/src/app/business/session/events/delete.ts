import { ISessionService } from '../ISessionService';
import { EventPayload, ACTION_STATUS, IResultMessage, IActionResult } from 'common/actions';
import { Session } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';

export type DeleteSessionEventPayload = EventPayload<string>;
export const DELETE_SESSION_EVENT = 'DELETE_SESSION_EVENT';

const deleteEventCreator = (status: ACTION_STATUS, aggregate?: string, messages?: Array<IResultMessage>): Action<DeleteSessionEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: DELETE_SESSION_EVENT,
});

// 'delete' word can't be used
export const remove = (sessionService: ISessionService, id: string) => {
  return async (dispatch) => {
    dispatch(deleteEventCreator('PENDING'));
    return sessionService.delete(id).then((entityDeleteResult: IActionResult<string>) => {
      dispatch(deleteEventCreator('SUCCESS', entityDeleteResult.entity));
      return entityDeleteResult;
    }).catch((error) => {
      dispatch(deleteEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
