import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Brick } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IBrickService } from '../IBrickService';

export type DeleteBrickEventPayload = EventPayload<string>;
export const DELETE_BRICK_EVENT = 'DELETE_BRICK_EVENT';

const deleteEventCreator = (status: ACTION_STATUS, aggregate?: string, messages?: Array<IResultMessage>): Action<DeleteBrickEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: DELETE_BRICK_EVENT,
});

// 'delete' word can't be used
export const remove = (brickService: IBrickService, id: string) => {
  return async (dispatch) => {
    dispatch(deleteEventCreator('PENDING'));
    return brickService.delete(id).then((entityDeleteResult: IActionResult<string>) => {
      dispatch(deleteEventCreator('SUCCESS', entityDeleteResult.entity));
      return entityDeleteResult;
    }).catch((error) => {
      dispatch(deleteEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
