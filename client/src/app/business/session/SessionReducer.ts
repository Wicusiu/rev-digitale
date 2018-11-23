import { handleActions, Action, ReducerMap, ReducerMapValue } from 'redux-actions';

import appInitialState from 'app/initialState';
import { Session } from 'app/api/mapper/swagger/typescript-fetch-client';
import { StateWithPagination } from 'common/state/StateWithPagination';
import { READ_SESSION_EVENT, ReadSessionEventPayload, UpdateSessionEventPayload, DeleteSessionEventPayload, AddSessionEventPayload, ADD_SESSION_EVENT, UPDATE_SESSION_EVENT, DELETE_SESSION_EVENT } from './SessionEvents';
import { DefaultReadEntityReducerFactory } from 'common/state/DefaultEntityReducer';

export interface SessionState extends StateWithPagination<Session> { }

const INITIAL_STATE: SessionState = appInitialState.application.session;

type SessionEventPayload = AddSessionEventPayload | ReadSessionEventPayload | UpdateSessionEventPayload | DeleteSessionEventPayload;

const readSessionReducer = DefaultReadEntityReducerFactory<Session>();

const SessionReducerMapper: ReducerMap<SessionState, SessionEventPayload> = {
  [READ_SESSION_EVENT]: readSessionReducer,
  // ADD_SESSION_EVENT]: unPublishMessageReducer,
};

export const SessionReducer = handleActions<SessionState, SessionEventPayload>(SessionReducerMapper, INITIAL_STATE);
