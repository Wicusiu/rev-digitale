import { combineReducers } from 'redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationReducer, ApplicationState } from 'app/business/ApplicationReducer';
import { routerReducer } from 'react-router-redux';

export type InstanceState = {
  application: ApplicationState,
  routing: RouteComponentProps<any, any>,
};

const reducers = combineReducers<InstanceState>({
  application: ApplicationReducer,
  routing: routerReducer,
});

export default reducers;
