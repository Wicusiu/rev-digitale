import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Brick } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IBrickService } from './IBrickService';

export type CountBrickEventPayload = EventPayload<Brick>;
export const COUNT_BRICK_EVENT = 'COUNT_BRICK_EVENT';

export type AddBrickEventPayload = EventPayload<Brick>;
export const ADD_BRICK_EVENT = 'ADD_BRICK_EVENT';

const addEventCreator = (status: ACTION_STATUS, aggregate?: Brick, messages?: Array<IResultMessage>): Action<CountBrickEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: ADD_BRICK_EVENT,
});

export const add = function (briqueService: IBrickService, entity: Brick) {
  return async (dispatch) => {
    dispatch(addEventCreator('PENDING'));
    return briqueService.add(entity).then((entityAddResult: IActionResult<Brick>) => {
      dispatch(addEventCreator('SUCCESS', entityAddResult.entity));
      return entityAddResult;
    }).catch((error) => {
      dispatch(addEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};

export type ReadBrickEventPayload = EventPayload<Brick>;
export const READ_BRICK_EVENT = 'READ_BRICK_EVENT';

const readEventCreator = (status: ACTION_STATUS, aggregate?: Brick, messages?: Array<IResultMessage>): Action<CountBrickEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: READ_BRICK_EVENT,
});

export const read = function (briqueService: IBrickService, id: string) {
  return async (dispatch) => {
    dispatch(readEventCreator('PENDING'));
    return briqueService.read(id).then((brique: Brick) => {
      dispatch(readEventCreator('SUCCESS', brique));
      return brique;
    }).catch((error) => {
      dispatch(readEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};

export type UpdateBrickEventPayload = EventPayload<Brick>;
export const UPDATE_BRICK_EVENT = 'UPDATE_BRICK_EVENT';

const updateEventCreator = (status: ACTION_STATUS, aggregate?: Brick, messages?: Array<IResultMessage>): Action<CountBrickEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: UPDATE_BRICK_EVENT,
});

export const update = function (briqueService: IBrickService, entity: Brick) {
  return async (dispatch) => {
    dispatch(updateEventCreator('PENDING'));
    return briqueService.update(entity).then((entityUpdateResult: IActionResult<Brick>) => {
      dispatch(updateEventCreator('SUCCESS', entityUpdateResult.entity));
      return entityUpdateResult;
    }).catch((error) => {
      dispatch(updateEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};

export type DeleteBrickEventPayload = EventPayload<Brick>;
export const DELETE_BRICK_EVENT = 'DELETE_BRICK_EVENT';

const deleteEventCreator = (status: ACTION_STATUS, aggregate?: Brick, messages?: Array<IResultMessage>): Action<CountBrickEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: DELETE_BRICK_EVENT,
});

// 'delete' word can't be used
export const remove = (briqueService: IBrickService, id: string) => {
  return async (dispatch) => {
    dispatch(deleteEventCreator('PENDING'));
    return briqueService.delete(id).then((entityDeleteResult: IActionResult<Brick>) => {
      dispatch(deleteEventCreator('SUCCESS', entityDeleteResult.entity));
      return entityDeleteResult;
    }).catch((error) => {
      dispatch(deleteEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
