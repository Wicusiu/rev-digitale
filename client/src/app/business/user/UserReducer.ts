import { handleActions, Action, ReducerMap, ReducerMapValue } from 'redux-actions';

import appInitialState from 'app/initialState';
import { User } from 'app/api/mapper/swagger/typescript-fetch-client';
import { StateWithPagination } from 'common/state/StateWithPagination';
import { READ_USER_EVENT, ReadUserEventPayload, SignInUserEventPayload, SIGNIN_USER_EVENT, SignOutUserEventPayload, SIGNOUT_USER_EVENT } from './UserEvents';
import { DefaultReadEntityReducerFactory } from 'common/state/DefaultReadEntityReducer';
import { IUser } from './User';

export interface UserState extends StateWithPagination<User> {
  authenticatedUser?: IUser;
}

const INITIAL_STATE: UserState = appInitialState.application.user;

type UserEventPayload = ReadUserEventPayload | SignInUserEventPayload | SignOutUserEventPayload;

const readUserReducer = DefaultReadEntityReducerFactory<User>();

const signInUserReducer: ReducerMapValue<UserState, SignInUserEventPayload> = (state: UserState, action: Action<SignInUserEventPayload>): UserState => {
  return Object.assign({}, state, <UserState>{
    errors: action.payload.status === 'FAILURE' ? action.payload.messages : null,
    isFetching: action.payload.status === 'PENDING',
    authenticatedUser: action.payload.aggregate ? action.payload.aggregate : null,
  });
};

const signOutUserReducer: ReducerMapValue<UserState, SignInUserEventPayload> = (state: UserState, action: Action<SignInUserEventPayload>): UserState => {
  return Object.assign({}, state, <UserState>{
    errors: action.payload.status === 'FAILURE' ? action.payload.messages : null,
    isFetching: action.payload.status === 'PENDING',
    authenticatedUser: action.payload.aggregate ? action.payload.aggregate : null,
  });
};

const UserReducerMapper: ReducerMap<UserState, UserEventPayload> = {
  [READ_USER_EVENT]: readUserReducer,
  [SIGNIN_USER_EVENT]: signInUserReducer,
  [SIGNOUT_USER_EVENT]: signOutUserReducer,
};

export const UserReducer = handleActions<UserState, UserEventPayload>(UserReducerMapper, INITIAL_STATE);
