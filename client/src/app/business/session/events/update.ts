
import { ISessionService } from '../ISessionService';
import { EventPayload, ACTION_STATUS, IResultMessage, IActionResult } from 'common/actions';
import { Session } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';

export type UpdateSessionEventPayload = EventPayload<Session>;
export const UPDATE_SESSION_EVENT = 'UPDATE_SESSION_EVENT';

const updateEventCreator = (status: ACTION_STATUS, aggregate?: Session, messages?: Array<IResultMessage>): Action<UpdateSessionEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: UPDATE_SESSION_EVENT,
});

export const update = function (sessionService: ISessionService, entity: Session) {
  return async (dispatch) => {
    dispatch(updateEventCreator('PENDING'));
    return sessionService.update(entity).then((entityUpdateResult: IActionResult<Session>) => {
      dispatch(updateEventCreator('SUCCESS', entityUpdateResult.entity));
      return entityUpdateResult;
    }).catch((error) => {
      dispatch(updateEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
