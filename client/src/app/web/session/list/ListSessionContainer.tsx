import { Dispatch } from 'react';
import { ServiceFactory } from 'app/web/ServiceFactory';
import { InstanceState } from 'app/reducers';
import { RouteComponentProps } from 'react-router';
import { WithThemeProps } from '@up-group/react-controls';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { read, add, update, list, getByUser } from 'app/business/session/SessionEvents';
import { SessionService } from 'app/api/SessionService';
import ListSessionComponent, { IListSessionComponentProps } from './ListSessionComponent';
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
    getByUser: (authToken: string, userId: string) => {
      const sessionService = ServiceFactory.create(SessionService, dispatch, authToken);
      return dispatch(getByUser(sessionService, userId));
    },
    navigateTo: (route: string) => dispatch(push(route)),
  } as Partial<IListSessionComponentProps>;
};

const mapStateToProps = function (state: InstanceState, ownProps: IListSessionComponentProps & WithThemeProps & RouteComponentProps<any, { id?: string }>) {
  const passedProps = ownProps.route && ownProps.route.props ? ownProps.route.props : {};

  return {
    // Props passed to the container
    ...passedProps,
    // User State
    authToken: state.application.user.authenticatedUser ? state.application.user.authenticatedUser.token : null,
    authenticatedUser: state.application.user.authenticatedUser,
    // Session state
    errors: state.application.session.errors,
    session: state.application.session.currentValue,
    sessions: state.application.session.values,
    isFetching: state.application.session.isFetching,
  } as Partial<IListSessionComponentProps>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ListSessionComponent);
