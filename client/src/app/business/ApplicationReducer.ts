import { messageReducer, MessageState } from './message/MessageReducer';
import { combineReducers } from 'redux';
import { BrickState } from './brick/BrickReducer';

const combinedReducer = combineReducers({
  message: messageReducer,
});

export interface ApplicationState {
  message: MessageState;
  brick: BrickState;
}

export { combinedReducer as ApplicationReducer };
