export type ACTION_STATUS = 'PENDING' | 'SUCCESS' | 'FAILURE';

export type EventPayload<T> = {
  aggregate : T,
  status : ACTION_STATUS,
  messages? : IResultMessage[] };

export type ActionSize = 'icon' | 'xsmall' | 'small' | 'normal' | 'large' | 'xl' ;

export type ActionType = 'save' | 'cancel' | 'print' | 'read' | 'edit' | 'delete' | 'add' | 'analyse' | 'open' | 'pay' | 'filter' | 'export' | 'document' | 'send' | 'search' | 'verify' | 'go_to_next' | 'go_to_previous' | 'enable' | 'disable';

export type IntentType = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' | 'default' | 'error' | 'light' | 'social' ;

export interface IAction {
  label : string ;
  execute : () => void ;
  intent : IntentType,
  disabled? : boolean,
  type? : ActionType,
  iconName? : string,
  icon?: string,
  tooltip?: string;
  size?:ActionSize;
}

export enum ErrorCode {
}

export interface IResultMessage {
  code? : ErrorCode;
  message : string | JSX.Element;
  intent : IntentType;
}

export interface IActionResult<T> {
  entity? : T;
  messages?: IResultMessage[];
  succeeded? : boolean;
}

export const resolveErrorsToMessages = (errors) : IResultMessage[] => {
  let messages = errors;
  if (errors.message) { // Error 500 not catched by http status middleware
    // tslint:disable-next-line:prefer-array-literal
    messages = new Array<IResultMessage>();
    messages.push({ intent : 'error', message : errors.message });
  }

  return messages;
};
