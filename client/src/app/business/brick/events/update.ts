import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Brick } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IBrickService } from '../IBrickService';

export type UpdateBrickEventPayload = EventPayload<Brick>;
export const UPDATE_BRICK_EVENT = 'UPDATE_BRICK_EVENT';

const updateEventCreator = (status: ACTION_STATUS, aggregate?: Brick, messages?: Array<IResultMessage>): Action<UpdateBrickEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: UPDATE_BRICK_EVENT,
});

export const update = function (brickService: IBrickService, entity: Brick) {
  return async (dispatch) => {
    dispatch(updateEventCreator('PENDING'));
    return brickService.update(entity).then((entityUpdateResult: IActionResult<Brick>) => {
      dispatch(updateEventCreator('SUCCESS', entityUpdateResult.entity));
      return entityUpdateResult;
    }).catch((error) => {
      dispatch(updateEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
