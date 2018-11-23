import * as React from 'react';
import { style, media } from 'typestyle';
import { DeviceSmartphones } from 'common/utils/devices';

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

const ListItem: React.SFC<IListItemProps> = ({ children, ...others }) => {
  return (<li className={defaultListItemStyles} {...others}>
    {children}
  </li>);
};

export default ListItem;
