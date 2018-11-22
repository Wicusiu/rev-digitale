import * as React from 'react';
import { IResultMessage } from 'common/actions';
import { IUser } from 'app/business/user/USer';
import Scrollable from 'app/components/Scrollable';
import ResponsiveBox from 'app/components/ResponsiveBox';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { UpLabel, UpPassword, UpInput, WithThemeProps, UpDefaultTheme, UpButton, UpBox, UpNotification } from '@up-group/react-controls';
import { style } from 'typestyle';
import { UserCredentials } from 'app/api/mapper/swagger/typescript-fetch-client';
import { PATH_TO_REDIRECT_AFTER_LOGIN } from 'app/localStorage';
import { RouterAction } from 'react-router-redux';
import { RouteComponentProps } from 'react-router';

export interface LoginComponentProps {
  isFetching: boolean;
  authToken: string;
  authenticatedUser: IUser;
  errors: Array<IResultMessage>;
  title?: string;
  authUser: (credentials: UserCredentials) => Promise<IUser>;
  onUserAuthenticated: () => RouterAction;
  clearState: () => void;
}

class LoginComponent extends React.Component<LoginComponentProps & WithThemeProps & RouteComponentProps<any, {}>> {

  public static defaultProps = {
    theme: UpDefaultTheme,
  };

  login = async (values: UserCredentials) => {
    try {
      const user = await this.props.authUser(values);
      const pathname = localStorage.getItem(PATH_TO_REDIRECT_AFTER_LOGIN);
      if (pathname && pathname !== 'null') {
        localStorage.removeItem(PATH_TO_REDIRECT_AFTER_LOGIN);
        this.props.router.replace(atob(pathname));
      } else {
        // Go to the default path
        this.props.onUserAuthenticated();
      }
      return Promise.resolve(user);
    } catch (errors) {
      console.error(errors);
    }
  }

  render() {
    const colorClass = style({
      color: this.props.theme.colorMap.primary,
    });
    return (
      <Scrollable>
        <ResponsiveBox
          message={
            <span>
              Connexion <span className={colorClass}>{this.props.title}</span>
            </span>
          }
        >
          <Formik
            initialValues={{ email: 'guillaume.chomat@up.coop', password: 'Arcan69!' }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              return this.login(values);
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
          </Formik>
        </ResponsiveBox>
      </Scrollable>
    );
  }
}

export default LoginComponent;
