import { Middleware } from 'app/api/JsonServiceBase';
import { Dispatch } from 'react-redux';
import { publishMessage } from 'app/business/message/MessageAction';
import { IResultMessage } from 'common/actions';
import { isEmpty } from 'common/utils';
import { ErrorCode } from './ErrorCodes';

const middleware = function (dispatch, httpStatusCodeMiddlewareConfig): Middleware {
  return function (response: Response): Promise<Response> {
    const statusCodeToExecute = Object.getOwnPropertyNames(httpStatusCodeMiddlewareConfig).find((httpErrorCode) => {
      return response.status && httpErrorCode === response.status.toString();
    });
    return (httpStatusCodeMiddlewareConfig[statusCodeToExecute]) ? httpStatusCodeMiddlewareConfig[statusCodeToExecute](dispatch, response) : Promise.resolve(<Response>response);
  };
};

export interface IError {
  code: string;
  label: string;
  level: any;
}

export const Level = {
  0: 'error',
};

const mapErrorToResultMessage = (error: IError): IResultMessage => {
  const resultMessage: IResultMessage = { message: error.label, code: ErrorCode[error.code], intent: 'error' };
  return resultMessage;
};

// this is application specific
const applicationHttpStatusCodeMiddlewares = {
  400(dispatch: Dispatch<any>, response: Response): Promise<Response> {
    // Retourne la liste des erreurs
    return response.text().then((text) => {
      const messages = JSON.parse(text);
      const resultMessages = new Array<IResultMessage>();
      if (messages && messages.Message) {
        resultMessages.push({
          intent: 'error',
          message: messages.Message,
        });
        Object.getOwnPropertyNames(messages.ModelState).map((property) => {
          if (!isEmpty(messages.ModelState[property])) {
            messages.ModelState[property].map(message => resultMessages.push({
              message,
              intent: 'error',
            }));
          }
        });
      } else if (!isEmpty(messages)) {
        messages.forEach((message) => {
          resultMessages.push({
            intent: 'error',
            message: message.label,
          });
        });
      }

      return Promise.reject(resultMessages);
    });
  },
  401(dispatch: Dispatch<any>, response: Response): Promise<Response> {
    // dispatch(SignOut());
    // Retourne la liste des erreurs
    return response.text().then(text => Promise.reject(text ? JSON.parse(text).map(mapErrorToResultMessage) : []));
  },
  403(dispatch: Dispatch<any>, response: Response): Promise<Array<IError>> {
    // Retourne la liste des erreurs
    return response.text().then(text => Promise.reject(text ? JSON.parse(text).map(mapErrorToResultMessage) : []));
  },
  404(dispatch: Dispatch<any>, response: Response): Promise<Response> {
    console.warn('status code 404');
    // dispatch(push('/'));
    const messages = new Array<IResultMessage>();
    messages.push({ message: 'La ressource demandée n\'existe pas', intent: 'error', code: ErrorCode.DomainEntityNotFound });
    return Promise.reject(messages);
  },
  500(dispatch: Dispatch<any>, response: Response): Promise<Response> {
    return response.text().then((text) => {
      const result = text ? JSON.parse(text) : null;
      let resultMessages: IResultMessage[] = null;
      if (result != null) {
        resultMessages = new Array<IResultMessage>();
        resultMessages.push({
          intent: 'error',
          message: result.Message,
        });
        dispatch(publishMessage({
          message: resultMessages[0].message,
          intent: resultMessages[0].intent,
          displayMode: 'toast',
          title: 'Notification',
        }));
      }
      return Promise.reject(resultMessages);
    });
  },
  504(dispatch: Dispatch<any>, response: Response): Promise<Response> {
    // Timeout
    const resultMessages = new Array<IResultMessage>();
    resultMessages.push({ intent: 'error', message: 'Le serveur met trop de temps à répondre à votre requête' });
    return Promise.reject(resultMessages);
  },
};

export const HttpStatusCodeMiddleware = (dispatch) => { return middleware(dispatch, applicationHttpStatusCodeMiddlewares); };
