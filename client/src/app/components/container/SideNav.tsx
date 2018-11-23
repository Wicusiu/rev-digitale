import * as React from 'react';
import { style, media, keyframes } from 'typestyle';

import { Link } from 'react-router';

import * as classnames from 'classnames';

import { colorMap, AppTheme, ThemeProps, defaultIconStyle } from 'common/theme/theme';
import { body1RightGreyLevel2 } from 'common/theme//styleguide';
import { DeviceSmartphones } from 'common/utils/devices';
import { WithThemeProps, UpDefaultTheme, UpThemeInterface } from '@up-group/react-controls';
import ListItem from '../display/ListItem';
import List from '../display/List';
import Divider from '../display/Divider';

const ListStyle = style({
  paddingTop: 0,
  marginLeft: 0,
});

const subMenuListStyle = style({
  overflowX: 'hidden',
  overflowY: 'auto',
  height: 'calc(100vh - 80px)', // Menu bar
});

const sideNavStyle = style({
  width: '216px',
  zIndex: 1000,
  position: 'relative',
  height: 'calc(100% - 0px)',
  overflow: 'hidden',
  backgroundColor: 'white',
  float: 'left',
  boxShadow: '2px 0 8px 0 rgba(0, 0, 0, 0.4)',
  '-webkit-transition': 'width 0.5s',
  transition: 'width 0.5s',
},
  media(DeviceSmartphones, {
    width: '0px',
    position: 'absolute',
    transform: 'translate(-216px)',
    zIndex: 9999,
  }));

const displayMenu = style({},
  media(DeviceSmartphones, {
    display: 'block',
    width: '216px',
    transform: 'translate(0px)',
  }));

const logo = style({
  height: '40px',
  objectFit: 'contain',
  margin: '16px',
});

const listItem = style({
  height: '40px',
  marginTop: '12px',
  padding: 0,
});

const firstListItem = style({
  height: '72px',
  padding: 0,
});

const iconSize = {
  height: 32,
  width: 32,
};

const customLogo = style({
  fontFamily: 'materialinear',
  fontSize: '24px',
  width: '32px',
  height: '32px',
  margin: '4px',
  marginTop: '8px',
  textAlign: 'center',
});

const textItems = style({
  fontFamily: 'roboto',
  textTransform: 'uppercase',
  fontSize: '14px',
  padding: 0,
  marginLeft: '4px',
},
  media(DeviceSmartphones, {
    whiteSpace: 'nowrap',
  }));

const LinkStyle = style({
  ...body1RightGreyLevel2,
  textDecoration: 'none',
  paddingLeft: '16px',
  paddingRight: '16px',
  display: 'inline-block',
  width: 'calc(100%)',
});

const activeLinkStyle = style({
  $nest: {
    '& .up-link-wrapper': {
      borderRadius: '4px',
      backgroundColor: colorMap.lightGrey,
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      display: 'inline-block',
      width: 'calc(100%)',
    },
  },
  borderLeft: `4px solid black`,
});

const linkWrapper = style({
  display: 'inline-block',
  padding: '4px 20px 4px 4px',
  width: 'calc(100%)',
});

const disabledLink = style({
  pointerEvents: 'none',
});

const FullLinkStyle = style({
  width: '100%',
});

const iconMenuStyle = style({
  position: 'absolute',
  right: '20px',
  width: '36px',
  left: 'inherit',
  zIndex: 9999,
  cursor: 'pointer',
  display: 'none',
  fontSize: '32px',
  top: '4px',
},
  media(DeviceSmartphones, {
    display: 'block',
    color: 'white',
  }));

const closedMenuStyle = style({
  left: '20px',
  right: 'inherit',
});

export interface IMenuItemData {
  title?: string;
  uri?: string;
  icon?: string;
  iconClass?: string;
  isSelected?: boolean;
  isVisible?: boolean;
  disabled?: boolean;
  childMenuItems?: IMenuItemData[];
}

const RenderSubMenu = ({ menu, theme }: { menu: IMenuItemData, theme: UpThemeInterface }) => {
  return (
    <ListItem className={classnames(listItem)} button={true}>
      <Link className={classnames(FullLinkStyle)} to={menu.uri} activeClassName={classnames(activeLinkStyle, style({ borderLeftColor: theme.colorMap.primary }))}>
        <span className={classnames(LinkStyle, { [`${disabledLink}`]: menu.disabled === true })}>
          <span className={classnames('up-link-wrapper', linkWrapper)}>
            {(menu.icon || menu.iconClass) &&
              <span className={classnames(customLogo, menu.iconClass)}>{menu.icon}</span>
            }
            <span className={textItems}>{menu.title}</span>
          </span>
        </span>
      </Link>
    </ListItem>
  );
};

export interface ISideNavProps {
  menuItems: IMenuItemData[];
  showMenu?: boolean;
}

export interface ISideNavState {
  showMenu?: boolean;
}

class SideNav extends React.Component<ISideNavProps & WithThemeProps, ISideNavState> {

  static defaultProps: ISideNavProps & WithThemeProps = {
    menuItems: [],
    theme: UpDefaultTheme,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      showMenu: this.props.showMenu,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showMenu !== this.props.showMenu) {
      this.setState({ showMenu: nextProps.showMenu });
    }
  }

  toggleMenu = () => {
    this.setState({ showMenu: this.state.showMenu == null ? true : !this.state.showMenu });
  }

  render() {
    const { menuItems, theme } = this.props;

    return (
      <>
        <nav className={classnames(sideNavStyle, this.state.showMenu === true ? displayMenu : '')}>
          {
            menuItems.map((menuItem, index) => {
              return (
                <List key={index} className={ListStyle} onClick={this.toggleMenu}>
                  <ListItem className={classnames(firstListItem, style({ backgroundColor: theme.colorMap.primary }))}>
                    <img src={`${menuItem.icon}`}
                      className={logo} />
                  </ListItem>
                  <Divider />
                  <List key={`subMenu-${index}`} className={classnames(ListStyle, subMenuListStyle)}>
                    {menuItem.childMenuItems &&
                      menuItem.childMenuItems.map((menuItem, index) => {
                        return <RenderSubMenu key={index} theme={theme} menu={menuItem} />;
                      })
                    }
                  </List>
                </List>
              );
            })
          }
          <Divider />
        </nav>
        <div className={classnames(iconMenuStyle, style({ backgroundColor: theme.colorMap.primary }), this.state.showMenu !== true ? closedMenuStyle : '')}>
          <span onClick={this.toggleMenu} className={classnames(defaultIconStyle, this.state.showMenu ? 'icon-close' : 'icon-menu')}></span>
        </div>
      </>);
  }
}

// export default withTheme<ISideNavProps>(SideNav);
export default SideNav;
