import * as React from 'react';

import { connect, Dispatch } from 'react-redux';
import { apiMiddleware } from 'app/api/ApiMiddlewares';
import { InstanceState } from 'app/reducers';
import { BASE_URL } from 'app/config';
import LoginComponent, { LoginComponentProps } from 'app/web/login/LoginComponent';
import { push } from 'react-router-redux';
import { signIn, signOutEventCreator, authSignIn } from 'app/business/user/UserEvents';
import { UserCredentials } from 'app/api/mapper/swagger/typescript-fetch-client';
import { UserService } from 'app/api/UserService';
import { WithThemeProps } from '@up-group/react-controls';
import { RouteComponentProps } from 'react-router';
import { AuthCredentials } from 'app/business/user/IUserService';

const mapDispatchToProps = function (dispatch: Dispatch<any>) {
  const userService = new UserService(BASE_URL, null, apiMiddleware(dispatch));
  return {
    authUser: (credentials: UserCredentials) => {
      const args = { ...credentials };
      return dispatch(signIn(userService, args));
    },
    authSignIn: (credentials: AuthCredentials) => {
      const args = { ...credentials };
      return dispatch(authSignIn(userService, args));
    },
    onUserAuthenticated: () => {
      return dispatch(push('/bricks'));
    },
    clearState: () => {
      dispatch(signOutEventCreator('SUCCESS'));
    },
  } as Partial<LoginComponentProps>;
};

const mapStateToProps = function (state: InstanceState, ownProps: LoginComponentProps & WithThemeProps & RouteComponentProps<any, {}>) {

  const passedProps = ownProps.route && ownProps.route.props ? ownProps.route.props : {};

  return {
    ...passedProps,
    authCode: ownProps.location && ownProps.location.query ? ownProps.location.query.code : null,
    isFetching: state.application.user.isFetching,
    authToken: state.application.user.authenticatedUser ? state.application.user.authenticatedUser.token : null,
    authenticatedUser: state.application.user.authenticatedUser,
    errors: state.application.user.errors,
  } as Partial<LoginComponentProps>;
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
