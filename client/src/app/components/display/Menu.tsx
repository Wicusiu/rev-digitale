import * as React from 'react';

import { colorMap } from 'common/theme/theme';

import {
  body1RightGreyLevel1,
} from 'common/theme/styleguide';

import { style } from 'typestyle';
import * as classnames from 'classnames';

const MenuStyle = style(
  {
    backgroundColor: colorMap.white,
    backgroundClip: 'padding-box',
    border: `1px solid ${colorMap.lightGrey}`,
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    outline: 'none',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  });

const MenuItemStyle = style(
  {
    ...body1RightGreyLevel1,
    boxSizing: 'border-box',
    display: 'inline-block',
    width: '100%',
    padding: '16px 24px',
    border: 0,
    cursor: 'pointer',
    $nest: {
      '&:hover': {
        backgroundColor: colorMap.lightGrey,
      },
    },
  });

const MenuItemDividerStyle = style({
  color: colorMap.pinkishGrey,
  backgroundColor: colorMap.pinkishGrey,
  display: 'inline-block',
  margin: '0px',
  width: '100%',
});

export interface IMenuItem {
  icon?: any;
  label?: string;
  isDivider?: boolean;
  onClick?: () => void;
}

export interface IMenuProps {
  items: Array<IMenuItem>;
  dividerSize?: number;
  className?: string;
}

const MenuItemDivider = ({ size }) => <div style={{ height: size }} className={MenuItemDividerStyle}></div>;

const MenuItem = (item: IMenuItem) => {
  if (item.isDivider) {
    return <MenuItemDivider size={1} />;
  }
  return (
    <div className={MenuItemStyle} onClick={item.onClick}>
      {item.icon &&
        item.icon
      }
      {item.label}
    </div>);
};

class Menu extends React.Component<IMenuProps> {
  static defaultProps: IMenuProps = {
    items: [],
    dividerSize: 1,
  };
  render() {
    const { items } = this.props;
    return (
      <nav className={classnames(MenuStyle, this.props.className)}>
        {items.map((item, index) => <MenuItem key={index} {...item} />)}
      </nav>
    );
  }
}

export default Menu;
