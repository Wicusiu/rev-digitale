import { Dispatch } from 'react';
import { ServiceFactory } from 'app/web/ServiceFactory';
import { InstanceState } from 'app/reducers';
import { RouteComponentProps } from 'react-router';
import { WithThemeProps } from '@up-group/react-controls';
import { connect } from 'react-redux';
import { isEmpty } from 'common/utils';
import { push } from 'react-router-redux';
import { ModuleService } from 'app/api/ModuleService';
import { read } from 'app/business/session/SessionEvents';
import { list } from 'app/business/module/ModuleEvents';
import { SessionService } from 'app/api/SessionService';
import EditSessionComponent, { IEditSessionComponentProps } from './EditSessionComponent';

const mapDispatchToProps = function (dispatch: Dispatch<any>) {
  return {
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
    ...passedProps,
    sessionId: ownProps.params ? ownProps.params.id : null,
    modules: state.application.session.values,
    authToken: state.application.user.authenticatedUser ? state.application.user.authenticatedUser.token : null,
    authenticatedUser: state.application.user.authenticatedUser,
    errors: state.application.session.errors,
    session: state.application.session.currentValue,
    isFetching: state.application.session.isFetching,
  } as Partial<IEditSessionComponentProps>;
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSessionComponent);
