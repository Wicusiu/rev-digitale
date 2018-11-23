import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { style, media } from 'typestyle';

import { push } from 'react-router-redux';

import { InstanceState } from 'app/reducers';
import { DeviceSmartphones } from 'common/utils/devices';
import Background from 'app/web/Background';
import { PATH_TO_REDIRECT_AFTER_LOGIN } from 'app/localStorage';
import { UpBox, UpNotification } from '@up-group/react-controls';

export interface IRestrictedContainerProps {
  children?: any;
  isAuthed?: boolean;
  redirectToLogin: () => void;
  location?: any;
}

const pageInfoStyle = style({
  height: 'calc(100%)',
}, media(DeviceSmartphones, {
  padding: '20px',
}));

export function restrict(Component: React.ComponentClass) {

  class RestrictedAcces extends React.Component<{ redirectToLogin: () => void }, { ticks: number }> {
    private intervalLoop: any;

    constructor(props) {
      super(props);
      const TIME_TO_REDIRECT = 3;
      this.state = { ticks: TIME_TO_REDIRECT };
    }

    componentDidMount() {
      const CONT_DOWN_SPEED = 1000;
      this.intervalLoop = setInterval(() => {
        if (this.state.ticks - 1 >= 0) {
          this.setState({ ticks: this.state.ticks - 1 });
        } else {
          clearInterval(this.intervalLoop);
          this.props.redirectToLogin();
        }
      }, CONT_DOWN_SPEED);
    }

    componentWillUnmount() {
      clearInterval(this.intervalLoop);
    }

    render() {
      return (<Background>
        <UpBox className={pageInfoStyle} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <UpNotification intent={'info'}>
            Vous avez été déconnecté. Vous allez être redirigé vers la page d'authentification
            dans {this.state.ticks} secondes
          </UpNotification>
        </UpBox>
      </Background>);
    }
  }

  class RestrictedContainer extends React.Component<IRestrictedContainerProps> {

    componentDidMount() {
      if (!this.props.isAuthed) {
        if (this.props.location.pathname) {
          localStorage.setItem(PATH_TO_REDIRECT_AFTER_LOGIN, btoa(this.props.location.pathname));
        }
      }
    }

    render() {
      const { children, isAuthed } = this.props;

      if (!isAuthed) {
        return <RestrictedAcces redirectToLogin={this.props.redirectToLogin} />;
      }

      return (
        <Component>
          {children}
        </Component>
      );
    }
  }

  function mapStateToProps(state: InstanceState) {
    if (state.application.user === null) {
      throw 'Unable to display Layout : authToken not found';
    }

    return {
      isAuthed: state.application.user.authenticatedUser != null && state.application.user.authenticatedUser.token != null,
    };
  }

  function mapDispatchToProps(dispatch: Dispatch<any>, ownProps: any) {
    return {
      redirectToLogin: () => {
        return dispatch(push('/'));
      },
    };
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RestrictedContainer as any);
}
