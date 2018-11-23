import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Module } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IModuleService } from './IModuleService';

export type CountModuleEventPayload = EventPayload<Module>;
export const COUNT_MODULE_EVENT = 'COUNT_MODULE_EVENT';

export type AddModuleEventPayload = EventPayload<Module>;
export const ADD_MODULE_EVENT = 'ADD_MODULE_EVENT';

const addEventCreator = (status: ACTION_STATUS, aggregate?: Module, messages?: Array<IResultMessage>): Action<CountModuleEventPayload> => ({
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

export type ReadModuleEventPayload = EventPayload<Module>;
export const READ_MODULE_EVENT = 'READ_MODULE_EVENT';

const readEventCreator = (status: ACTION_STATUS, aggregate?: Module, messages?: Array<IResultMessage>): Action<CountModuleEventPayload> => ({
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

export type UpdateModuleEventPayload = EventPayload<Module>;
export const UPDATE_MODULE_EVENT = 'UPDATE_MODULE_EVENT';

const updateEventCreator = (status: ACTION_STATUS, aggregate?: Module, messages?: Array<IResultMessage>): Action<CountModuleEventPayload> => ({
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
