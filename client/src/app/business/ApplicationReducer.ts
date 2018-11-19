import { messageReducer, MessageState } from './message/MessageReducer';
import { combineReducers } from 'redux';

const combinedReducer = combineReducers({
  message: messageReducer,
});

export interface ApplicationState {
  message: MessageState;
  // brick:
}

export { combinedReducer as ApplicationReducer };
