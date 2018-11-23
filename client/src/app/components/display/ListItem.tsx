import * as React from 'react';
import { style, media } from 'typestyle';
import { DeviceSmartphones } from 'common/utils/devices';
import * as classnames from 'classnames';

interface IListItemProps extends React.HTMLProps<any> {
  children?: React.ReactNode;
  button?: boolean;
}

const defaultListItemStyles = style({
  listStyle: 'none',
},
  media(DeviceSmartphones, {
    width: 'calc(100%)',
  }));

const ListItem: React.SFC<IListItemProps> = ({ children, className, ...others }) => {
  return (<li {...others} className={classnames(defaultListItemStyles, className)}>
    {children}
  </li>);
};

export default ListItem;
