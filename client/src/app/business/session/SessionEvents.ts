import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Session } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { ISessionService } from './ISessionService';

export type CountSessionEventPayload = EventPayload<Session>;
export const COUNT_SESSION_EVENT = 'COUNT_SESSION_EVENT';

export type AddSessionEventPayload = EventPayload<Session>;
export const ADD_SESSION_EVENT = 'ADD_SESSION_EVENT';

const addEventCreator = (status: ACTION_STATUS, aggregate?: Session, messages?: Array<IResultMessage>): Action<CountSessionEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: ADD_SESSION_EVENT,
});

export const add = function (sessionService: ISessionService, entity: Session) {
  return async (dispatch) => {
    dispatch(addEventCreator('PENDING'));
    return sessionService.add(entity).then((entityAddResult: IActionResult<Session>) => {
      dispatch(addEventCreator('SUCCESS', entityAddResult.entity));
      return entityAddResult;
    }).catch((error) => {
      dispatch(addEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};

export type ReadSessionEventPayload = EventPayload<Session>;
export const READ_SESSION_EVENT = 'READ_SESSION_EVENT';

const readEventCreator = (status: ACTION_STATUS, aggregate?: Session, messages?: Array<IResultMessage>): Action<CountSessionEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: READ_SESSION_EVENT,
});

export const read = function (sessionService: ISessionService, id: string) {
  return async (dispatch) => {
    dispatch(readEventCreator('PENDING'));
    return sessionService.read(id).then((session: Session) => {
      dispatch(readEventCreator('SUCCESS', session));
      return session;
    }).catch((error) => {
      dispatch(readEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};

export type UpdateSessionEventPayload = EventPayload<Session>;
export const UPDATE_SESSION_EVENT = 'UPDATE_SESSION_EVENT';

const updateEventCreator = (status: ACTION_STATUS, aggregate?: Session, messages?: Array<IResultMessage>): Action<CountSessionEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: UPDATE_SESSION_EVENT,
});

export const update = function (sessionService: ISessionService, entity: Session) {
  return async (dispatch) => {
    dispatch(updateEventCreator('PENDING'));
    return sessionService.update(entity).then((entityUpdateResult: IActionResult<Session>) => {
      dispatch(updateEventCreator('SUCCESS', entityUpdateResult.entity));
      return entityUpdateResult;
    }).catch((error) => {
      dispatch(updateEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};

export type DeleteSessionEventPayload = EventPayload<string>;
export const DELETE_SESSION_EVENT = 'DELETE_SESSION_EVENT';

const deleteEventCreator = (status: ACTION_STATUS, aggregate?: string, messages?: Array<IResultMessage>): Action<DeleteSessionEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: DELETE_SESSION_EVENT,
});

// 'delete' word can't be used
export const remove = (sessionService: ISessionService, id: string) => {
  return async (dispatch) => {
    dispatch(deleteEventCreator('PENDING'));
    return sessionService.delete(id).then((entityDeleteResult: IActionResult<string>) => {
      dispatch(deleteEventCreator('SUCCESS', entityDeleteResult.entity));
      return entityDeleteResult;
    }).catch((error) => {
      dispatch(deleteEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
