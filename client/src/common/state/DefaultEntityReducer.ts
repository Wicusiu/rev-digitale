import { StateWithPagination } from './StateWithPagination';
import { IEntity } from 'common/service/IEntity';
import { Action, ReducerMapValue } from 'redux-actions';
import { EventPayload } from 'common/actions';

export const DefaultReadEntityReducerFactory = <T extends IEntity>(): ReducerMapValue<StateWithPagination<T>, EventPayload<T>> => {
  return (state: StateWithPagination<T>, action: Action<EventPayload<T>>): StateWithPagination<T> => {
    return {
      errors: action.payload.status === 'FAILURE' ? action.payload.messages : null,
      currentValue: action.payload.aggregate,
      isFetching: action.payload.status === 'PENDING',
    };
  };
};

export const DefaultListEntityReducerFactory = <T extends IEntity>(): ReducerMapValue<StateWithPagination<T>, EventPayload<Array<T>>> => {
  return (state: StateWithPagination<T>, action: Action<EventPayload<Array<T>>>): StateWithPagination<T> => {
    return {
      errors: action.payload.status === 'FAILURE' ? action.payload.messages : null,
      values: action.payload.aggregate,
      isFetching: action.payload.status === 'PENDING',
    };
  };
};
