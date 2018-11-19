import { combineReducers } from 'redux';
import { reducer as reduxFormReducer, FormReducer, FormState } from 'redux-form';
import { RouteComponentProps } from 'react-router';
import { ApplicationReducer, ApplicationState } from 'app/business/ApplicationReducer';
import { routerReducer } from 'react-router-redux';
import { i18nReducer } from 'react-redux-i18n';

export type InstanceState = {
  application: ApplicationState,
  form: FormState,
  routing: RouteComponentProps<any, any>,
};

const reducers = combineReducers<InstanceState>({
  application: ApplicationReducer,
  routing: routerReducer,
  form: reduxFormReducer,
  i18n: i18nReducer,
});

export default reducers;
