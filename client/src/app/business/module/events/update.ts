
import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Module } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IModuleService } from '../IModuleService';

export type UpdateModuleEventPayload = EventPayload<Module>;
export const UPDATE_MODULE_EVENT = 'UPDATE_MODULE_EVENT';

const updateEventCreator = (status: ACTION_STATUS, aggregate?: Module, messages?: Array<IResultMessage>): Action<UpdateModuleEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: UPDATE_MODULE_EVENT,
});

export const update = function (moduleService: IModuleService, entity: Module) {
  return async (dispatch) => {
    dispatch(updateEventCreator('PENDING'));
    return moduleService.update(entity).then((entityUpdateResult: IActionResult<Module>) => {
      dispatch(updateEventCreator('SUCCESS', entityUpdateResult.entity));
      return entityUpdateResult;
    }).catch((error) => {
      dispatch(updateEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
