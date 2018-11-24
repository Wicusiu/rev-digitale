import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Module } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IModuleService } from '../IModuleService';

export type DeleteModuleEventPayload = EventPayload<string>;
export const DELETE_MODULE_EVENT = 'DELETE_MODULE_EVENT';

const deleteEventCreator = (status: ACTION_STATUS, aggregate?: string, messages?: Array<IResultMessage>): Action<DeleteModuleEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: DELETE_MODULE_EVENT,
});

// 'delete' word can't be used
export const remove = (moduleService: IModuleService, id: string) => {
  return async (dispatch) => {
    dispatch(deleteEventCreator('PENDING'));
    return moduleService.delete(id).then((entityDeleteResult: IActionResult<string>) => {
      dispatch(deleteEventCreator('SUCCESS', entityDeleteResult.entity));
      return entityDeleteResult;
    }).catch((error) => {
      dispatch(deleteEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
