import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Module } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IModuleService } from '../IModuleService';

export type ReadModuleEventPayload = EventPayload<Module>;
export const READ_MODULE_EVENT = 'READ_MODULE_EVENT';

const readEventCreator = (status: ACTION_STATUS, aggregate?: Module, messages?: Array<IResultMessage>): Action<ReadModuleEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: READ_MODULE_EVENT,
});

export const read = function (moduleService: IModuleService, id: string) {
  return async (dispatch) => {
    dispatch(readEventCreator('PENDING'));
    return moduleService.read(id).then((module: Module) => {
      dispatch(readEventCreator('SUCCESS', module));
      return module;
    }).catch((error) => {
      dispatch(readEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
