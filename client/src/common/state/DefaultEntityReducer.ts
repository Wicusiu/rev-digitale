import { StateWithPagination } from './StateWithPagination';
import { Action, ReducerMapValue } from 'redux-actions';
import { EventPayload } from 'common/actions';

export const DefaultReadEntityReducerFactory = <T extends object>(): ReducerMapValue<StateWithPagination<T>, EventPayload<T>> => {
  return (state: StateWithPagination<T>, action: Action<EventPayload<T>>): StateWithPagination<T> => {
    return {
      ...state,
      errors: action.payload.status === 'FAILURE' ? action.payload.messages : null,
      currentValue: action.payload.aggregate,
      isFetching: action.payload.status === 'PENDING',
    };
  };
};

export const DefaultAddEntityReducerFactory = <T extends object>(): ReducerMapValue<StateWithPagination<T>, EventPayload<T>> => {
  return (state: StateWithPagination<T>, action: Action<EventPayload<T>>): StateWithPagination<T> => {
    return {
      ...state,
      errors: action.payload.status === 'FAILURE' ? action.payload.messages : null,
      currentValue: action.payload.status === 'SUCCESS' ? action.payload.aggregate : null,
      isProcessing: action.payload.status === 'PENDING',
    };
  };
};

export const DefaultListEntityReducerFactory = <T extends object>(): ReducerMapValue<StateWithPagination<T>, EventPayload<Array<T>>> => {
  return (state: StateWithPagination<T>, action: Action<EventPayload<Array<T>>>): StateWithPagination<T> => {
    return {
      ...state,
      errors: action.payload.status === 'FAILURE' ? action.payload.messages : null,
      values: action.payload.aggregate,
      isFetching: action.payload.status === 'PENDING',
    };
  };
};
