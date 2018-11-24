import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Module } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IModuleService } from '../IModuleService';

export type AddModuleEventPayload = EventPayload<Module>;
export const ADD_MODULE_EVENT = 'ADD_MODULE_EVENT';

const addEventCreator = (status: ACTION_STATUS, aggregate?: Module, messages?: Array<IResultMessage>): Action<AddModuleEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: ADD_MODULE_EVENT,
});

export const add = function (moduleService: IModuleService, entity: Module) {
  return async (dispatch) => {
    dispatch(addEventCreator('PENDING'));
    return moduleService.add(entity).then((entityAddResult: IActionResult<Module>) => {
      dispatch(addEventCreator('SUCCESS', entityAddResult.entity));
      return entityAddResult;
    }).catch((error) => {
      dispatch(addEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
