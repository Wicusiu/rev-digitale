import { handleActions, Action, ReducerMap, ReducerMapValue } from 'redux-actions';

import appInitialState from 'app/initialState';
import { IResultMessage } from 'common/actions';
import { Brick } from 'app/api/mapper/swagger/typescript-fetch-client';
import { StateWithPagination } from 'common/state/StateWithPagination';
import { READ_BRICK_EVENT, ReadBrickEventPayload, UpdateBrickEventPayload, DeleteBrickEventPayload, AddBrickEventPayload, ADD_BRICK_EVENT, UPDATE_BRICK_EVENT, DELETE_BRICK_EVENT, LIST_BRICK_EVENT, ListBrickEventPayload } from './BrickEvents';
import { DefaultReadEntityReducerFactory, DefaultListEntityReducerFactory } from 'common/state/DefaultEntityReducer';

export interface BrickState extends StateWithPagination<Brick> { }

const INITIAL_STATE: BrickState = appInitialState.application.brick;

type BrickEventPayload = AddBrickEventPayload | ReadBrickEventPayload | UpdateBrickEventPayload | DeleteBrickEventPayload | ListBrickEventPayload;

const readBrickReducer = DefaultReadEntityReducerFactory<Brick>();
const listBrickReducer = DefaultListEntityReducerFactory<Brick>();

const BrickReducerMapper: ReducerMap<BrickState, BrickEventPayload> = {
  [READ_BRICK_EVENT]: readBrickReducer,
  [LIST_BRICK_EVENT]: listBrickReducer,
};

export const BrickReducer = handleActions<BrickState, BrickEventPayload>(BrickReducerMapper, INITIAL_STATE);
