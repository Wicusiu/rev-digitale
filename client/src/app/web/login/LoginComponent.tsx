import * as React from 'react';
import { IResultMessage } from 'common/actions';
import { IUser } from 'app/business/user/USer';
import Scrollable from 'app/components/container/Scrollable';
import ResponsiveBox from 'app/components/container/ResponsiveBox';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { UpLabel, UpPassword, UpInput, WithThemeProps, UpDefaultTheme, UpButton, UpBox, UpNotification, UpLoadingIndicator } from '@up-group/react-controls';
import { style } from 'typestyle';
import { UserCredentials, JwtToken } from 'app/api/mapper/swagger/typescript-fetch-client';
import { PATH_TO_REDIRECT_AFTER_LOGIN } from 'app/localStorage';
import { RouterAction } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';
import { AUTH_URL } from 'app/config';
import { generateId } from 'common/utils';

import * as URI from 'urijs';
import * as querystring from 'query-string';
import { AuthCredentials } from 'app/business/user/IUserService';

export interface LoginComponentProps {
  isFetching: boolean;
  authToken: string;
  authenticatedUser: IUser;
  errors: Array<IResultMessage>;
  title?: string;
  authCode?: string;
  authSignIn: (credentials: AuthCredentials) => Promise<IUser>;
  authUser: (credentials: UserCredentials) => Promise<IUser>;
  onUserAuthenticated: () => RouterAction;
  clearState: () => void;
}

export interface LoginComponentState {
  authState?: string;
}

class LoginComponent extends React.Component<LoginComponentProps & WithThemeProps & RouteComponentProps<any, {}>, LoginComponentState> {

  public static defaultProps = {
    theme: UpDefaultTheme,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      authState: null,
    };
  }

  componentDidMount() {
    const uri = new URI(window.location);
    const redirectUri = `${uri.protocol()}://${uri.host()}/login`;
    if (this.props.authCode == null && this.props.authenticatedUser == null) {
      const authState = generateId();
      this.setState({ authState }, () => {
        // Redirect to the OAuth server
        window.location.href = AUTH_URL.replace('STATE_CODE', authState).replace('URI_CODE', querystring.stringify({ redirect_uri: redirectUri }));
      });
    } else if (this.props.authCode != null && this.props.authenticatedUser == null) {
      // Send the authSign command
      this.props.authSignIn({
        code: this.props.authCode,
        redirect_uri: redirectUri,
      }).then((user: JwtToken) => {
        const pathname = localStorage.getItem(PATH_TO_REDIRECT_AFTER_LOGIN);
        if (pathname && pathname !== 'null') {
          localStorage.removeItem(PATH_TO_REDIRECT_AFTER_LOGIN);
          this.props.router.replace(atob(pathname));
        } else {
          // Go to the default path
          this.props.onUserAuthenticated();
        }
        return Promise.resolve(user);
      });
    }
  }

  render() {
    const colorClass = style({
      color: this.props.theme.colorMap.primary,
    });

    const drawbackForm = <Formik
      initialValues={{ email: 'guillaume.chomat@up.coop', password: 'Fripon69' }}
      onSubmit={(values, { setSubmitting }) => {
        return null; // this.login(values);
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required('Required'),
      })}>
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <UpLabel text={'Email'} >
              <UpInput
                name={'email'}
                type={'email'}
                error={errors.email === undefined ? null : errors.email}
                hasError={errors.email != null}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={'Votre email'} />
            </UpLabel>
            <UpLabel text={'Password'} >
              <UpPassword name={'password'}
                value={values.password}
                onChange={handleChange}
                placeholder={'Votre mot de passe'} />
            </UpLabel>
            <UpBox flexDirection={'row'} alignItems={'flex-start'} justifyContent={'center'} style={{ margin: '20px 0px' }}>
              <UpButton type={'submit'} disabled={isSubmitting} intent={'primary'} actionType={'user'}>Se connecter</UpButton>
            </UpBox>
            {this.props.errors &&
              this.props.errors.map((error) => {
                return (
                  <div style={{ margin: '10px 0px' }}>
                    <UpNotification {...error} dismissable={true} />
                  </div>
                );
              })
            }
          </form>
        );
      }}
    </Formik>;

    return (
      <Scrollable>
        <ResponsiveBox
          message={
            <span>
              Connexion <span className={colorClass}>{this.props.title}</span>
            </span>
          }
        >
          <UpLoadingIndicator isLoading={true} message={'Authentification en cours...'} />
        </ResponsiveBox>
      </Scrollable>
    );
  }
}

export default LoginComponent;
