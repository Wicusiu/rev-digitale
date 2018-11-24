import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Brick } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IBrickService } from '../IBrickService';

export type ListBrickEventPayload = EventPayload<Array<Brick>>;
export const LIST_BRICK_EVENT = 'LIST_BRICK_EVENT';

const listEventCreator = (status: ACTION_STATUS, aggregate?: Array<Brick>, messages?: Array<IResultMessage>): Action<ListBrickEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: LIST_BRICK_EVENT,
});

export const list = function (brickService: IBrickService) {
  return async (dispatch) => {
    dispatch(listEventCreator('PENDING'));
    return brickService.all().then((bricks: Array<Brick>) => {
      dispatch(listEventCreator('SUCCESS', bricks));
      return bricks;
    }).catch((error) => {
      dispatch(listEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
