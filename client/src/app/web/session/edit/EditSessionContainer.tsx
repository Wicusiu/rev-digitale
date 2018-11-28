import { Dispatch } from 'react';
import { ServiceFactory } from 'app/web/ServiceFactory';
import { InstanceState } from 'app/reducers';
import { RouteComponentProps } from 'react-router';
import { WithThemeProps } from '@up-group/react-controls';
import { connect } from 'react-redux';
import { isEmpty } from 'common/utils';
import { push } from 'react-router-redux';
import { ModuleService } from 'app/api/ModuleService';
import { read, add, update } from 'app/business/session/SessionEvents';
import { list } from 'app/business/module/ModuleEvents';
import { SessionService } from 'app/api/SessionService';
import EditSessionComponent, { IEditSessionComponentProps } from './EditSessionComponent';
import { NewSession, Session } from 'app/api/mapper/swagger/typescript-fetch-client';

const mapDispatchToProps = function (dispatch: Dispatch<any>) {
  return {
    add: (authToken: string, args: NewSession) => {
      const sessionService = ServiceFactory.create(SessionService, dispatch, authToken);
      return dispatch(add(sessionService, args));
    },
    update: (authToken: string, args: Session) => {
      const sessionService = ServiceFactory.create(SessionService, dispatch, authToken);
      return dispatch(update(sessionService, args));
    },
    read: (authToken: string, id: string) => {
      const sessionService = ServiceFactory.create(SessionService, dispatch, authToken);
      return dispatch(read(sessionService, id));
    },
    getModules: (authToken: string) => {
      const moduleService = ServiceFactory.create(ModuleService, dispatch, authToken);
      return dispatch(list(moduleService));
    },
    navigateTo: (route: string) => dispatch(push(route)),
  } as Partial<IEditSessionComponentProps>;
};

const mapStateToProps = function (state: InstanceState, ownProps: IEditSessionComponentProps & WithThemeProps & RouteComponentProps<any, { id?: string }>) {
  const passedProps = ownProps.route && ownProps.route.props ? ownProps.route.props : {};

  return {
    // Props passed to the container
    ...passedProps,
    // User State
    authToken: state.application.user.authenticatedUser ? state.application.user.authenticatedUser.token : null,
    authenticatedUser: state.application.user.authenticatedUser,
    // Session state
    sessionId: ownProps.params ? ownProps.params.id : null,
    errors: state.application.session.errors,
    session: state.application.session.currentValue,
    isFetching: state.application.session.isFetching,
    // Module state
    modules: state.application.module.values,
  } as Partial<IEditSessionComponentProps>;
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSessionComponent);
