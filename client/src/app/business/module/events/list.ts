import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Module } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IModuleService } from '../IModuleService';

export type ListModuleEventPayload = EventPayload<Array<Module>>;
export const LIST_MODULE_EVENT = 'LIST_MODULE_EVENT';

const listEventCreator = (status: ACTION_STATUS, aggregate?: Array<Module>, messages?: Array<IResultMessage>): Action<ListModuleEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: LIST_MODULE_EVENT,
});

export const list = function (brickService: IModuleService) {
  return async (dispatch) => {
    dispatch(listEventCreator('PENDING'));
    return brickService.all().then((bricks: Array<Module>) => {
      dispatch(listEventCreator('SUCCESS', bricks));
      return bricks;
    }).catch((error) => {
      dispatch(listEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
