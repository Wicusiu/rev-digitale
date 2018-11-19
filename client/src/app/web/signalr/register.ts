import { userHubProxy } from './proxy';
import { publishMessage } from 'app/business/message/MessageAction';
import { invokeCommand } from 'app/web/signalr/middleware';

enum MessageType
{
    Toast = 0,
    Modal = 1,
    Link = 2,
}

enum MessageIntentType
{
    Error = 0,
    Info = 1,
    Success = 2,
    Warning = 3,
}

export interface ToastMessage
{
  message : string;
  title: string;
  intentType: MessageIntentType;
  autoDismissable:boolean;
}

export interface NotificationMessage {
  messageType : MessageType;
  data : ToastMessage;
}

export function signalRRegisterListeners(store: any) {
  if (userHubProxy) {
    userHubProxy.on('onPush', (message: NotificationMessage)  => {
      if (message.messageType === MessageType.Toast) {
        store.dispatch(publishMessage({
          message : message.data.message,
          title: message.data.title || 'Notification',
          intent : 'info',
          displayMode: 'toast',
          autoDismissable: message.data.autoDismissable,
        }));
      }
    });

    const currentBeforeUnloadHandler : any = window.onbeforeunload ;
    window.onbeforeunload = (e) => {
      if (currentBeforeUnloadHandler) {
        const result = currentBeforeUnloadHandler(e) ;
        if (result != null) {
          return result ;
        }
      }
      if (store.getState().user.user.token != null && store.getState().user.user.entity != null) {
        invokeCommand('UserSignOut', () => {}, store.getState().user.user.entity.id);
      }
    };

    // Auto (re)sign user ?
    if (store.getState().user.user.token != null) {
      invokeCommand('UserSignOut', () => {
        invokeCommand('UserSignIn', () => {}, store.getState().user.user.entity.id);
      });
    }
  }
}
