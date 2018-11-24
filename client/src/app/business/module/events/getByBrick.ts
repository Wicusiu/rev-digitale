import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Module } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IModuleService } from '../IModuleService';

export type GetByBrickModuleEventPayload = EventPayload<Array<Module>>;
export const GET_BY_BRICK_MODULE_EVENT = 'GET_BY_BRICK_MODULE_EVENT';

const getByBrickEventCreator = (status: ACTION_STATUS, aggregate?: Array<Module>, messages?: Array<IResultMessage>): Action<GetByBrickModuleEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: GET_BY_BRICK_MODULE_EVENT,
});

export const getByBrick = function (brickService: IModuleService, id: string, filter?: string) {
  return async (dispatch) => {
    dispatch(getByBrickEventCreator('PENDING'));
    return brickService.getByBrickId(id).then((modules: Array<Module>) => {
      dispatch(getByBrickEventCreator('SUCCESS', modules));
      return modules;
    }).catch((error) => {
      dispatch(getByBrickEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
