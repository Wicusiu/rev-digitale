import { ErrorCode } from 'app/api/ErrorCodes';

export type ACTION_STATUS = 'PENDING' | 'SUCCESS' | 'FAILURE';

export type EventPayload<T> = {
  aggregate: T,
  status: ACTION_STATUS,
  messages?: IResultMessage[],
};

export type ActionSize = 'icon' | 'xsmall' | 'small' | 'normal' | 'large' | 'xl';

// export type ActionType = 'save' | 'cancel' | 'print' | 'read' | 'edit' | 'delete' | 'add' | 'analyse' | 'open' | 'pay' | 'filter' | 'export' | 'document' | 'send' | 'search' ;
export type ActionType = 'save' | 'cancel' | 'read' | 'edit' | 'delete' | 'add' | 'open' | 'filter' | 'export' | 'document' | 'send' | 'search';

export type IntentType = 'primary' | 'danger' | 'warning' | 'success' | 'info' | 'default' | 'error' | 'light';

export interface IAction {
  label: string;
  execute: () => void;
  intent: IntentType,
  disabled?: boolean,
  type?: ActionType,
  iconName?: string,
  icon?: string,
  tooltip?: string;
  size?: ActionSize;
}

export interface IResultMessage {
  code?: ErrorCode;
  message: string | JSX.Element;
  intent: IntentType;
}

export interface IActionResult<T> {
  entity?: T;
  messages?: IResultMessage[];
  succeeded?: boolean;
}

export const resolveErrorsToMessages = (errors): IResultMessage[] => {
  let messages = errors;
  if (errors.message) { // Error 500 not catched by http status middleware
    // tslint:disable-next-line:prefer-array-literal
    messages = new Array<IResultMessage>();
    messages.push({ intent: 'error', message: errors.message });
  }

  return messages;
};
