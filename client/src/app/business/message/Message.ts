import { IntentType } from 'common/actions';

export interface IMessage {
  message: string | JSX.Element;
  intent: IntentType;
  iconName?: string;
  title?: string;
}

export type DisplayMode = 'toast' | 'snack' | 'modal';

export class Message implements IMessage {
  public message: string | JSX.Element;
  public intent: IntentType;
  public code?: any;
  public iconName?: string;
  public title?: string;
  public displayMode?: DisplayMode;
  public autoDismissable?: boolean;

  constructor(text: string | JSX.Element, intent: IntentType, displayMode: DisplayMode = 'toast', title: string = 'Notification') {
    this.message = text;
    this.intent = intent;
    this.displayMode = displayMode;
  }
}
