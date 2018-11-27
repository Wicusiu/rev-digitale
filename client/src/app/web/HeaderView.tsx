import * as React from 'react';
import { connect } from 'react-redux';

import { style, media } from 'typestyle';
import * as classnames from 'classnames';
import * as moment from 'moment';

import { ThemeProps } from 'common/theme/theme';
import { DeviceSmartphones } from 'common/utils/devices';
import { InstanceState } from 'app/reducers';
import { IUser } from 'app/business/user/User';
import { WithThemeProps, UpBox, UpDefaultTheme } from '@up-group/react-controls';
import Avatar from 'app/components/display/Avatar';
import Menu, { IMenuItem } from 'app/components/display/Menu';

const appBarStyle = style({
  position: 'relative',
  height: '4.5rem',
  width: 'calc(100% - 216px)',
  float: 'left',
  zIndex: 1039,
}, media(DeviceSmartphones, {
  width: 'calc(100%)',
  height: '3rem',
}));

const profileSectionStyle = style({
  position: 'absolute',
  right: '1rem',
  top: '18px',
  display: 'flex',
  width: 'auto',
  cursor: 'pointer',
}, media(DeviceSmartphones, {
  top: '8px',
}));

const establishmentStyle = style({
  textAlign: 'center',
  top: '18px',
  height: '1.25rem',
  fontSize: '1.2em',
  fontWeight: 'bold',
  width: 'auto',
  cursor: 'pointer',
}, media(DeviceSmartphones, {
  display: 'none',
}));

const logoStyle = style({
  position: 'absolute',
  left: '1rem',
  maxWidth: '100%',
  display: 'none',
}, media(DeviceSmartphones, {
  display: 'block',
}));

const loginShowStyle = style({
  fontFamily: 'Roboto',
  fontSize: '0.875rem',
  marginLeft: '0.5rem',
  display: 'inline-block',
});

const dropdownIconStyle = style({
  fontFamily: 'materialinear',
  fontSize: '0.875rem',
  lineHeight: 1.43,
  textAlign: 'center',
  color: 'white',
  marginLeft: '0.5rem',
  textDecoration: 'none',
  display: 'inline-block',
});

const dropdownMenuWrapperStyle = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'flex-start',
});

const dropdownMenuStyle = style({
  width: '185px',
  top: '50px',
  right: '2px',
  position: 'absolute',
  zIndex: 100,
  opacity: 0,
  transform: 'scaleY(0)',
  transformOrigin: ' 50% 0',
  transition: 'transform 0.5s ease',
  $nest: {
    '&.toggled': {
      opacity: 1,
      transform: 'scaleY(1)',
    },
  },
}, media(DeviceSmartphones, {
  top: '35px',
  right: '0px',
}));

const lockLinkStyle = style({
  color: 'white',
  textDecoration: 'none',
  $nest: {
    '&:hover': {
      color: 'white',
      textDecoration: 'none',
    },
    '&:visited': {
      color: 'white',
      textDecoration: 'none',
    },
  },
});

export interface IHeaderProps extends ThemeProps {
  user?: IUser;
  logoUrl?: string;
  structureName?: string;
  items: IMenuItem[];
}

export interface IHeaderState {
  showMenu: boolean;
}

class HeaderView extends React.Component<IHeaderProps & WithThemeProps, IHeaderState> {

  static defaultProps = {
    theme: UpDefaultTheme,
  };

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  toggleState = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    const { user } = this.props;
    const isMenuToggled = this.state.showMenu;

    return (
      <div className={classnames(appBarStyle, style({ backgroundColor: this.props.theme.colorMap.primary }))}>
        <UpBox flexDirection={'row'}>
          <div>
            {this.props.logoUrl &&
              <div className={logoStyle}>
                <img src={this.props.logoUrl} />
              </div>
            }
            <div className={establishmentStyle}>
              <span>{this.props.structureName}</span>
            </div>
            <div className={profileSectionStyle}>
              <div className={dropdownMenuWrapperStyle} onClick={this.toggleState}>
                <Avatar size={'icon'} photo={user.photo ? user.photo : null} />
                <span className={loginShowStyle}>{user.first_name} {user.last_name}</span>
                <span className={classnames(dropdownIconStyle, 'icon-arrow_drop_down')} />
                <Menu className={classnames(dropdownMenuStyle, { toggled: isMenuToggled })}
                  items={this.props.items} />
              </div>
            </div>
          </div>
        </UpBox>
      </div>);
  }
}

function mapStateToProps(state: InstanceState) {
  if (state.application.user.authenticatedUser === null) {
    throw 'Unable to display Layout : authToken not found';
  }
  return {
    user: state.application.user.authenticatedUser,
    structureName: '',
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {};
}

export default connect(
  mapStateToProps, mapDispatchToProps,
)(HeaderView as any);
