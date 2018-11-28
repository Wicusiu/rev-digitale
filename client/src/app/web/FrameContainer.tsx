import * as React from 'react';
import { connect } from 'react-redux';
import IdleTimer from 'react-idle-timer';
import { style, media } from 'typestyle';
import FooterView from './FooterView';
import { push, replace } from 'react-router-redux';
import { Location } from 'history';
import { BASE_URL } from 'app/config';
import { InstanceState } from 'app/reducers';
import { withErrorBoundary, DefaultErrorBoundaryFallbackComponent } from './ErrorBoundary';
import { Message } from '../business/message/Message';
import { unPublishMessage, publishMessage } from '../business/message/MessageAction';
import * as Scroll from 'react-scroll';
import HeaderView from './HeaderView';
import { RouteComponentProps } from 'react-router';
import { IMenuItem } from 'app/components/display/Menu';
import { signOut } from 'app/business/user/UserEvents';
import { IUser } from 'app/business/user/User';
import { getWorkspaceMenu } from './MenuService';
import SideNav, { IMenuItemData } from 'app/components/container/SideNav';
import { IResultMessage } from 'common/actions';
import { generateId } from 'common/utils';
import MainContent from 'app/components/container/MainContent';
import { UpBox, UpLoadingIndicator, UpToast } from '@up-group/react-controls';
import { DeviceSmartphones } from 'common/utils/devices';

const Element = Scroll.Element;

const onError = (error: Error, componentStack: string) => {
  console.log(error, componentStack);
};

const goBackToHome = (error: Error, componentStack: string) => {
  console.log(error, componentStack);
};

const layoutStyle = style({
  height: '100vh',
  width: '80%',
}, media(DeviceSmartphones, {
  width: '100%',
}));

const IconStyle = style({
  fontFamily: 'materialinear',
  fontSize: '16px',
  color: '#333', // @TODO
  display: 'inline-block',
  marginRight: '8px',
});

interface IFrameContainerProps {
  authToken?: string;
  messages?: Message[];
  menuItems?: IMenuItemData[];
  user: IUser;
  location: Location;
  isLoading: boolean;
  getWorkspaceMenu: (
    user: IUser,
    icon: string,
  ) => Promise<IMenuItemData[]>;
  getProfileMenu: (
    user: IUser,
  ) => Promise<IMenuItem[]>;
  navigateTo: (path: string) => void;
  resetMessage: () => void;
  notification: (message: Message) => void;
}

export interface IFrameContainerState {
  profileItems: IMenuItem[];
  menuItems: IMenuItemData[];
  errors?: IResultMessage[];
  showMenu?: boolean;
  randomKey: string;
}

class FrameContainer extends React.Component<IFrameContainerProps & RouteComponentProps<any, any>, IFrameContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      profileItems: [],
      errors: [],
      randomKey: generateId(),
    };
  }

  handlePropsChange = (
    oldProps: IFrameContainerProps,
    newProps: IFrameContainerProps,
  ) => {

    if (!oldProps || (oldProps.user != null && oldProps.user.id !== newProps.user.id)) {
      newProps
        .getProfileMenu(newProps.user)
        .then(menuItems => this.setState({ profileItems: menuItems }))
        .catch((/*errors*/) => {
          // TODO : Affichage des erreurs
        });
    }

    newProps
      .getWorkspaceMenu(newProps.user, '')
      .then(menuItems => this.setState({ menuItems }))
      .catch((/*errors*/) => {
        // TODO : Affichage des erreurs
      });
  };

  componentDidMount() {
    this.handlePropsChange(null, this.props);
  }

  componentWillReceiveProps(nextProps: IFrameContainerProps) {
    this.handlePropsChange(this.props, nextProps);
  }

  closeWarning = () => {
    this.setState({ errors: [] });
  };

  render() {
    const { children, messages, user } = this.props;
    return (
      <IdleTimer
        element={document}
        onActive={() => {
        }}
        onIdle={() => { }}
        timeout={1000 * 60 * 60}>
        <div className={layoutStyle}>
          <SideNav menuItems={this.state.menuItems} />
          {this.props.user &&
            <HeaderView
              items={this.state.profileItems}
            />
          }
          <MainContent>
            <>
              <Element id="topAnchor" name="topAnchor" />
              {user &&
                (
                  <div key={this.state.randomKey}>
                    {children}
                    <FooterView
                      redirect={(url) => {
                        window.open(url);
                      }}
                    />
                  </div>
                )}
              {!user && (
                <UpBox alignItems={'center'} justifyContent={'center'}>
                  <UpLoadingIndicator
                    message={'Chargement en cours...'}
                    displayMode={'layer'}
                    isLoading={true}
                  />
                </UpBox>
              )}
              {messages &&
                messages.filter(m => m.displayMode === 'toast').length > 0 &&
                messages
                  .filter(m => m.displayMode === 'toast')
                  .map((element, index) => {
                    return (
                      <UpToast
                        key={`message-${index}`}
                        message={element.message}
                        title={element.title}
                        intent={element.intent}
                        autoDismissable={element.autoDismissable}
                        onClose={this.props.resetMessage}
                      />
                    );
                  })}
            </>
          </MainContent>
        </div>
      </IdleTimer>
    );
  }
}

function mapStateToProps(state: InstanceState, props) {
  if (state.application.user === null) {
    throw 'Unable to display Layout : authToken not found';
  }
  const entity = state.application.user.authenticatedUser;
  return {
    authToken: entity == null ? null : entity.token,
    user: entity,
    messages: state.application.message.entity,
    isLoading: state.application.user.isFetching,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    resetMessage: () => dispatch(unPublishMessage()),
    getProfileMenu: (user: IUser): Promise<IMenuItem[]> => {
      let menuItems = [];
      menuItems = [
        {
          label: 'Mon profil',
          onClick: () => dispatch(push(`/users/${user.id}/profil`)),
        },
        {
          isDivider: true,
        },
        {
          label: 'Se déconnecter',
          icon: <span className={IconStyle}></span>,
          onClick: () => dispatch(signOut()).then(() => {
            return dispatch(push('/login'));
          }),
        },
      ];
      return Promise.resolve(menuItems);
    },
    getWorkspaceMenu: (user: IUser, icon: string) => {
      return Promise.resolve([
        {
          icon,
          childMenuItems: getWorkspaceMenu(user),
        },
      ]);
    },
    navigateTo: (path: string) => {
      return dispatch(replace(path));
    },
    notification: (message: Message) => dispatch(publishMessage(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorBoundary(
  FrameContainer,
  DefaultErrorBoundaryFallbackComponent,
  onError,
) as any);
