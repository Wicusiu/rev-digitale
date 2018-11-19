import { Message } from 'app/business/message/Message';
import { Action } from 'redux-actions';
import { EventPayload } from 'common/actions';

export type PUBLISH_MESSAGE = EventPayload<Array<Message>>;
export const PUBLISH_MESSAGE = 'PUBLISH_MESSAGE';

export type UNPUBLISH_MESSAGE = EventPayload<null>;
export const UNPUBLISH_MESSAGE = 'UNPUBLISH_MESSAGE';

export const publishMessage = (message: Message): Action<PUBLISH_MESSAGE> => {
  const messages: Array<Message> = [];
  if (message.displayMode == null) {
    message.displayMode = 'toast';
  }
  messages.push(message);
  return {
    type: PUBLISH_MESSAGE,
    payload: { aggregate: messages, status: 'SUCCESS' },
  };
};

export const unPublishMessage = (): Action<UNPUBLISH_MESSAGE> => {
  return {
    type: UNPUBLISH_MESSAGE,
    payload: { aggregate: null, status: 'SUCCESS' },
  };
};
