import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { apiMiddleware } from 'app/api/ApiMiddlewares';
import { InstanceState } from 'app/reducers';
// import { Credentials } from 'user/user/IUserService';
// import { UserService } from 'app/api/UserService';
import { BASE_URL } from 'app/config';
import { LoginComponent, LoginComponentProps } from 'app/web/login/LoginComponent';
import { push } from 'react-router-redux';
// import { SignIn, resendToken, logoutStatus } from 'user/user/UserAction';
import { RouteComponentProps } from 'react-router';
// import { SignupArgs, SignInArgs } from 'app/api/mapper/swagger/typescript-fetch-client';
import { makeJWTConfig } from 'app/api/JsonServiceBase';

const mapDispatchToProps = function (dispatch: Dispatch<any>) {
  // const userService = new UserService(BASE_URL, null, apiMiddleware(dispatch));
  return {
    authUser: (credentials: any) => {
      const args = { ...credentials };
      if (args.device_type == null) {
        args.device_type = 'SignInArgs.DeviceTypeEnum.Browser';
      }
      // return dispatch(SignIn(userService, args));
    },
    navigateTo: (path) => {
      return dispatch(push(path));
    },
    onUserAuthenticated: () => {
      // dispatch(redirectUserToDefaultPath());
    },
    clearState: () => {
      // return dispatch(logoutStatus('SUCCESS'));
    },
  } as Partial<LoginComponentProps>;
};

const mapStateToProps = function (state: InstanceState, ownProps: LoginComponentProps & RouteComponentProps<any, { spaceType: string }>) {

  return {
    // isFetching: state.user.user.isLoading,
    // authToken: state.user.user.token,
    // authenticatedUser: state.user.user.entity,
    // errors: state.user.user.errors,
  } as Partial<LoginComponentProps>;
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
