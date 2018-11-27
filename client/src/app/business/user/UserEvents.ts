import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { User, UserCredentials } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IUserService } from './IUserService';
import { push } from 'react-router-redux';

export type SignInUserEventPayload = EventPayload<User>;
export type SignOutUserEventPayload = EventPayload<User>;
export const SIGNIN_USER_EVENT = 'SIGNIN_USER_EVENT';
export const SIGNOUT_USER_EVENT = 'SIGNOUT_USER_EVENT';

const signInEventCreator = (status: ACTION_STATUS, aggregate?: User, messages?: Array<IResultMessage>): Action<SignInUserEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: SIGNIN_USER_EVENT,
});

export const signOutEventCreator = (status: ACTION_STATUS): Action<SignOutUserEventPayload> => ({
  payload: {
    status,
    aggregate: null,
  },
  type: SIGNOUT_USER_EVENT,
});

export const signIn = function (userService: IUserService, entity: UserCredentials) {
  return async (dispatch) => {
    dispatch(signInEventCreator('PENDING'));
    return userService.signIn(entity).then((entity: User) => {
      dispatch(signInEventCreator('SUCCESS', entity));
      return entity;
    }).catch((error) => {
      dispatch(signInEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};

export const signOut = function () {
  return function (dispatch) {
    dispatch(signOutEventCreator('SUCCESS'));
    dispatch(push('/login'));
    return Promise.resolve();
  };
};

export type ReadUserEventPayload = EventPayload<User>;
export const READ_USER_EVENT = 'READ_USER_EVENT';

const readEventCreator = (status: ACTION_STATUS, aggregate?: User, messages?: Array<IResultMessage>): Action<ReadUserEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: READ_USER_EVENT,
});

export const read = function (userService: IUserService, id: string) {
  return async (dispatch) => {
    dispatch(readEventCreator('PENDING'));
    return userService.read(id).then((user: User) => {
      dispatch(readEventCreator('SUCCESS', user));
      return user;
    }).catch((error) => {
      dispatch(readEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
