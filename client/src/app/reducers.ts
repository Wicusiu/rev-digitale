import { combineReducers } from 'redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationReducer, ApplicationState } from 'app/business/ApplicationReducer';
import { routerReducer } from 'react-router-redux';
import { i18nReducer } from 'react-redux-i18n';

export type InstanceState = {
  application: ApplicationState,
  routing: RouteComponentProps<any, any>,
};

const reducers = combineReducers<InstanceState>({
  application: ApplicationReducer,
  routing: routerReducer,
  i18n: i18nReducer,
});

export default reducers;
