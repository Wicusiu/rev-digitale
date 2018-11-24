import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Brick } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IBrickService } from '../IBrickService';

export type AddBrickEventPayload = EventPayload<Brick>;
export const ADD_BRICK_EVENT = 'ADD_BRICK_EVENT';

const addEventCreator = (status: ACTION_STATUS, aggregate?: Brick, messages?: Array<IResultMessage>): Action<AddBrickEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: ADD_BRICK_EVENT,
});

export const add = function (brickService: IBrickService, entity: Brick) {
  return async (dispatch) => {
    dispatch(addEventCreator('PENDING'));
    return brickService.add(entity).then((entityAddResult: IActionResult<Brick>) => {
      dispatch(addEventCreator('SUCCESS', entityAddResult.entity));
      return entityAddResult;
    }).catch((error) => {
      dispatch(addEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
