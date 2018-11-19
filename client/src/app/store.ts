import { applyMiddleware, createStore, Middleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { get, throttle } from 'lodash';

import { __DEV__ } from './config';
import reducers from './reducers';
import { loadState, saveState } from './localStorage';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const persistedState = loadState();

const routeMiddleware = routerMiddleware(browserHistory);

function getMiddlewareArray(): Middleware[] {
  const middlewareArray: Middleware[] = [/*signalRInvokeMiddleware,*/ reduxThunk, routeMiddleware];

  const logger = createLogger({
    collapsed: true,
    predicate: (getState: any, action: any) => {
      const type = action.type;
      return type !== '@@redux-form/BLUR' &&
        type !== '@@redux-form/CHANGE' &&
        type !== '@@redux-form/FOCUS' &&
        type !== '@@redux-form/TOUCH';
    },
  });

  if (__DEV__ !== false) {
    return [
      ...middlewareArray,
      logger,
    ];
  }
  return middlewareArray;
}

let composeEnhancers = compose;
if (__DEV__ !== false && typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) {
  composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  });
}

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(...getMiddlewareArray())),
);

const getStateForPersistence = (store) => {
  return {};
};

// TODO : Replace by redux-persist
store.subscribe(throttle(
  () => {
    saveState({
      user: getStateForPersistence(store),
    });
  },
  1000));

export { store };
