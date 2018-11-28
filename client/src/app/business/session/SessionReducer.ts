import { handleActions, Action, ReducerMap, ReducerMapValue } from 'redux-actions';

import appInitialState from 'app/initialState';
import { Session } from 'app/api/mapper/swagger/typescript-fetch-client';
import { StateWithPagination } from 'common/state/StateWithPagination';
import { GET_BY_MODULE_SESSION_EVENT, READ_SESSION_EVENT, ReadSessionEventPayload, UpdateSessionEventPayload, DeleteSessionEventPayload, AddSessionEventPayload, ADD_SESSION_EVENT, UPDATE_SESSION_EVENT, DELETE_SESSION_EVENT } from './SessionEvents';
import { DefaultReadEntityReducerFactory, DefaultAddEntityReducerFactory, DefaultListEntityReducerFactory } from 'common/state/DefaultEntityReducer';
import { LIST_SESSION_EVENT, ListSessionEventPayload } from './events/list';

export interface SessionState extends StateWithPagination<Session> { }

const INITIAL_STATE: SessionState = appInitialState.application.session;

type SessionEventPayload = ListSessionEventPayload | AddSessionEventPayload | ReadSessionEventPayload | UpdateSessionEventPayload | DeleteSessionEventPayload;

const readSessionReducer = DefaultReadEntityReducerFactory<Session>();
const listSessionReducer = DefaultListEntityReducerFactory<Session>();
const addSessionReducer = DefaultAddEntityReducerFactory<Session>();

const SessionReducerMapper: ReducerMap<SessionState, SessionEventPayload> = {
  [READ_SESSION_EVENT]: readSessionReducer,
  [ADD_SESSION_EVENT]: addSessionReducer,
  [LIST_SESSION_EVENT]: listSessionReducer,
  [GET_BY_MODULE_SESSION_EVENT]: listSessionReducer,
};

export const SessionReducer = handleActions<SessionState, SessionEventPayload>(SessionReducerMapper, INITIAL_STATE);
