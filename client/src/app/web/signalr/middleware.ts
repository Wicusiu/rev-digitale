import { userHubProxy, signalrConnection } from './proxy';
import { ACTION_STATUS } from 'common/actions';

export const invokeCommand = (name, callback, ...params) => {
  if (signalrConnection && signalrConnection.state === $.signalR.connectionState.disconnected) {
    signalrConnection.start().then(() => userHubProxy.invoke(name, ...params).then(callback));
  } else if (userHubProxy) {
    userHubProxy.invoke(name, ...params).then(callback);
  }
};

export function signalRInvokeMiddleware(store: any) {
  return (next: any) => async (action: any) => {
    let user = null;
    switch (action.type) {
      case 'SIGNALR_PUSH' :
        user = store.getState().user.user.entity ;
        if (user != null) {
          invokeCommand('SendMessage', () => {}, action.payload.message);
        }
        break ;
    }
    return next(action);
  };
}
