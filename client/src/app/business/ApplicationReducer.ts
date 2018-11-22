import { MessageReducer, MessageState } from './message/MessageReducer';
import { combineReducers } from 'redux';
import { BrickState, BrickReducer } from './brick/BrickReducer';
import { UserState, UserReducer } from './user/UserReducer';

const combinedReducer = combineReducers({
  message: MessageReducer,
  brick: BrickReducer,
  user: UserReducer,
});

export interface ApplicationState {
  message: MessageState;
  brick: BrickState;
  user: UserState;
}

export { combinedReducer as ApplicationReducer };
