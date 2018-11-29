import { Dispatch } from 'react';
import { ModuleService } from 'app/api/ModuleService';
import ViewModuleComponent, { IViewModuleComponentProps } from './ViewModuleComponent';
import { ServiceFactory } from 'app/web/ServiceFactory';
import { read } from 'app/business/module/ModuleEvents';
import { register } from 'app/business/session/SessionEvents';

import { InstanceState } from 'app/reducers';
import { RouteComponentProps } from 'react-router';
import { WithThemeProps } from '@up-group/react-controls';
import { connect } from 'react-redux';
import { isEmpty } from 'common/utils';
import { push } from 'react-router-redux';
import { SessionService } from 'app/api/SessionService';
import { getByModule } from 'app/business/session/events/getByModule';
import { IntentType } from 'common/actions';
import { publishMessage } from 'app/business/message/MessageAction';

const mapDispatchToProps = function (dispatch: Dispatch<any>) {
  return {
    read: (authToken: string, id: string) => {
      const moduleService = ServiceFactory.create(ModuleService, dispatch, authToken);
      return dispatch(read(moduleService, id));
    },
    getSessions: (authToken: string, moduleId: string) => {
      const sessionService = ServiceFactory.create(SessionService, dispatch, authToken);
      return dispatch(getByModule(sessionService, moduleId));
    },
    viewSession: (id: string) => dispatch(push(`/sessions/edit/${id}`)),
    addSession: () => dispatch(push(`/sessions/add`)),
    registerToSession: (authToken: string, userId: string, sessionId: string) => {
      const sessionService = ServiceFactory.create(SessionService, dispatch, authToken);
      return dispatch(register(sessionService, userId, sessionId));
    },
    publishMessage: (message: string, intent: IntentType) => {
      return dispatch(publishMessage({
        message,
        intent,
      }));
    },
    navigateTo: (route: string) => dispatch(push(route)),
  } as Partial<IViewModuleComponentProps>;
};

const mapStateToProps = function (state: InstanceState, ownProps: IViewModuleComponentProps & WithThemeProps & RouteComponentProps<any, { id?: string }>) {
  const passedProps = ownProps.route && ownProps.route.props ? ownProps.route.props : {};

  return {
    ...passedProps,
    id: ownProps.params.id,
    authToken: state.application.user.authenticatedUser ? state.application.user.authenticatedUser.token : null,
    authenticatedUser: state.application.user.authenticatedUser,
    errors: state.application.module.errors,
    module: state.application.module.currentValue,
    isFetching: state.application.module.isFetching,
    isFetchingSession: state.application.session.isFetching,
    sessions: state.application.session.values,
    errorsSession: state.application.session.errors,
  } as Partial<IViewModuleComponentProps>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewModuleComponent);
