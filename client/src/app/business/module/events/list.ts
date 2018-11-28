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

export const list = function (moduleService: IModuleService) {
  return async (dispatch) => {
    dispatch(listEventCreator('PENDING'));
    return moduleService.all().then((modules: Array<Module>) => {
      dispatch(listEventCreator('SUCCESS', modules));
      return modules;
    }).catch((error) => {
      dispatch(listEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
