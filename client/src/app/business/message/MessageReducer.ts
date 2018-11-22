import { Message } from './Message';
import { PUBLISH_MESSAGE, UNPUBLISH_MESSAGE } from './MessageAction';
import { handleActions, Action, ReducerMap, ReducerMapValue } from 'redux-actions';
import appInitialState from 'app/initialState';

export type MessageState = {
  entity: Message[],
};

const INITIAL_STATE: MessageState = appInitialState.application.message;

type MESSAGE_EVENT = PUBLISH_MESSAGE | UNPUBLISH_MESSAGE;

const publishMessageReducer: ReducerMapValue<MessageState, PUBLISH_MESSAGE> = (state: MessageState, action: Action<PUBLISH_MESSAGE>): MessageState => {
  if (action.payload.status === 'SUCCESS') {
    return { ...state, entity: action.payload.aggregate };
  }
  console.warn('message actions should not have an other state than SUCCESS : store not changed ');

  return state;
};

const unPublishMessageReducer: ReducerMapValue<MessageState, UNPUBLISH_MESSAGE> = (state: MessageState, action: Action<UNPUBLISH_MESSAGE>): MessageState => {
  if (action.payload.status === 'SUCCESS') {
    return { ...state, entity: action.payload.aggregate };
  }
  console.warn('message actions should not have an other state than SUCCESS : store not changed ');

  return state;
};

const getMessageReducer: ReducerMap<MessageState, MESSAGE_EVENT> = {
  [PUBLISH_MESSAGE]: publishMessageReducer,
  [UNPUBLISH_MESSAGE]: unPublishMessageReducer,
};

export const MessageReducer = handleActions<MessageState, MESSAGE_EVENT>(getMessageReducer, INITIAL_STATE);
