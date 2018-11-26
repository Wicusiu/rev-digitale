import { handleActions, Action, ReducerMap, ReducerMapValue } from 'redux-actions';

import appInitialState from 'app/initialState';
import { Module } from 'app/api/mapper/swagger/typescript-fetch-client';
import { StateWithPagination } from 'common/state/StateWithPagination';
import { READ_MODULE_EVENT, ReadModuleEventPayload, UpdateModuleEventPayload, DeleteModuleEventPayload, AddModuleEventPayload, ADD_MODULE_EVENT, UPDATE_MODULE_EVENT, DELETE_MODULE_EVENT } from './ModuleEvents';
import { DefaultReadEntityReducerFactory, DefaultListEntityReducerFactory } from 'common/state/DefaultEntityReducer';
import { GET_BY_BRICK_MODULE_EVENT, GetByBrickModuleEventPayload } from './events/getByBrick';
import { LIST_MODULE_EVENT } from './events/list';

export interface ModuleState extends StateWithPagination<Module> { }

const INITIAL_STATE: ModuleState = appInitialState.application.module;

type ModuleEventPayload = AddModuleEventPayload | ReadModuleEventPayload | UpdateModuleEventPayload | DeleteModuleEventPayload | GetByBrickModuleEventPayload;

const readModuleReducer = DefaultReadEntityReducerFactory<Module>();
const listBrickReducer = DefaultListEntityReducerFactory<Module>();

const ModuleReducerMapper: ReducerMap<ModuleState, ModuleEventPayload> = {
  [READ_MODULE_EVENT]: readModuleReducer,
  [GET_BY_BRICK_MODULE_EVENT]: listBrickReducer,
  [LIST_MODULE_EVENT]: listBrickReducer,
};

export const ModuleReducer = handleActions<ModuleState, ModuleEventPayload>(ModuleReducerMapper, INITIAL_STATE);
