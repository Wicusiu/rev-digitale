import { handleActions, Action, ReducerMap, ReducerMapValue } from 'redux-actions';

import appInitialState from 'app/initialState';
import { IResultMessage } from 'common/actions';
import { Brique } from 'app/api/mapper/swagger/typescript-fetch-client';
import { StateWithPagination } from 'common/state/StateWithPagination';
import { READ_BRICK_EVENT, ReadBrickEventPayload, UpdateBrickEventPayload, DeleteBrickEventPayload, AddBrickEventPayload, ADD_BRICK_EVENT, UPDATE_BRICK_EVENT, DELETE_BRICK_EVENT } from './BrickEvents';
import { DefaultReadEntityReducerFactory } from 'common/state/DefaultReadEntityReducer';

export interface BrickState extends StateWithPagination<Brique> {}

const INITIAL_STATE: BrickState = appInitialState.application.brick;

type BrickEventPayload = AddBrickEventPayload | ReadBrickEventPayload | UpdateBrickEventPayload | DeleteBrickEventPayload;

const readBrickReducer  = DefaultReadEntityReducerFactory<Brique>();

const BrickReducerMapper : ReducerMap<BrickState, BrickEventPayload> = {
  [READ_BRICK_EVENT]: readBrickReducer,
  // ADD_BRICK_EVENT]: unPublishMessageReducer,
};

export const BrickReducer = handleActions<BrickState, BrickEventPayload>(BrickReducerMapper, INITIAL_STATE);
