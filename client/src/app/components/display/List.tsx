import * as React from 'react';
import { style, media } from 'typestyle';
import { DeviceSmartphones } from 'common/utils/devices';

interface IListProps extends React.HTMLProps<any> {
  children?: React.ReactNode;
}

const defaultlistStyles = style({
  listStyle: 'none',
},
  media(DeviceSmartphones, {
    width: 'calc(100%)',
  }));

const List: React.SFC<IListProps> = ({ children, ...others }) => {
  return (<ul className={defaultlistStyles} {...others}>
    {children}
  </ul>);
};

export default List;
