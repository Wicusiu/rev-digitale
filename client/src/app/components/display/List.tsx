import * as React from 'react';
import { style, media } from 'typestyle';
import { DeviceSmartphones } from 'common/utils/devices';
import * as classnames from 'classnames';

interface IListProps extends React.HTMLProps<any> {
  children?: React.ReactNode;
}

const defaultListStyles = style({
  listStyle: 'none',
  margin: '0px',
  padding: '0px',
},
  media(DeviceSmartphones, {
    width: 'calc(100%)',
  }));

const List: React.SFC<IListProps> = ({ children, className, ...others }) => {
  return (<ul  {...others} className={classnames(defaultListStyles, className)}>
    {children}
  </ul>);
};

export default List;
