import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Brick } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IBrickService } from '../IBrickService';

export type ReadBrickEventPayload = EventPayload<Brick>;
export const READ_BRICK_EVENT = 'READ_BRICK_EVENT';

const readEventCreator = (status: ACTION_STATUS, aggregate?: Brick, messages?: Array<IResultMessage>): Action<ReadBrickEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: READ_BRICK_EVENT,
});

export const read = function (brickService: IBrickService, id: string) {
  return async (dispatch) => {
    dispatch(readEventCreator('PENDING'));
    return brickService.read(id).then((brick: Brick) => {
      dispatch(readEventCreator('SUCCESS', brick));
      return brick;
    }).catch((error) => {
      dispatch(readEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
