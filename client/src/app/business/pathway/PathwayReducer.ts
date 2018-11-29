import { handleActions, Action, ReducerMap, ReducerMapValue } from 'redux-actions';

import appInitialState from 'app/initialState';
import { Pathway } from 'app/api/mapper/swagger/typescript-fetch-client';
import { StateWithPagination } from 'common/state/StateWithPagination';
import { READ_PATHWAY_EVENT, ReadPathwayEventPayload, UpdatePathwayEventPayload, DeletePathwayEventPayload, AddPathwayEventPayload, ADD_PATHWAY_EVENT, UPDATE_PATHWAY_EVENT, DELETE_PATHWAY_EVENT } from './PathwayEvents';
import { DefaultReadEntityReducerFactory, DefaultAddEntityReducerFactory, DefaultListEntityReducerFactory } from 'common/state/DefaultEntityReducer';
import { LIST_PATHWAY_EVENT, ListPathwayEventPayload } from './events/list';

export interface PathwayState extends StateWithPagination<Pathway> { }

const INITIAL_STATE: PathwayState = appInitialState.application.pathway;

type PathwayEventPayload = ListPathwayEventPayload | AddPathwayEventPayload | ReadPathwayEventPayload | UpdatePathwayEventPayload | DeletePathwayEventPayload;

const readPathwayReducer = DefaultReadEntityReducerFactory<Pathway>();
const listPathwayReducer = DefaultListEntityReducerFactory<Pathway>();
const addPathwayReducer = DefaultAddEntityReducerFactory<Pathway>();

const PathwayReducerMapper: ReducerMap<PathwayState, PathwayEventPayload> = {
  [READ_PATHWAY_EVENT]: readPathwayReducer,
  [ADD_PATHWAY_EVENT]: addPathwayReducer,
  [LIST_PATHWAY_EVENT]: listPathwayReducer,
};

export const PathwayReducer = handleActions<PathwayState, PathwayEventPayload>(PathwayReducerMapper, INITIAL_STATE);
