import { MessageReducer, MessageState } from './message/MessageReducer';
import { combineReducers } from 'redux';
import { BrickState, BrickReducer } from './brick/BrickReducer';
import { UserState, UserReducer } from './user/UserReducer';
import { ModuleReducer, ModuleState } from './module/ModuleReducer';
import { SessionReducer, SessionState } from './session/SessionReducer';
import { PathwayState, PathwayReducer } from './pathway/PathwayReducer';

const combinedReducer = combineReducers({
  message: MessageReducer,
  brick: BrickReducer,
  user: UserReducer,
  module: ModuleReducer,
  session: SessionReducer,
  pathway: PathwayReducer,
});

export interface ApplicationState {
  message: MessageState;
  brick: BrickState;
  user: UserState;
  module: ModuleState;
  session: SessionState;
  pathway: PathwayState;
}

export { combinedReducer as ApplicationReducer };
