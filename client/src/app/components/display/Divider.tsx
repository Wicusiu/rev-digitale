import * as React from 'react';
import { style, media } from 'typestyle';
import { DeviceSmartphones } from 'common/utils/devices';

interface IDividerProps extends React.HTMLProps<any> {
  children?: React.ReactNode;
}

const defaultStyles = style({
},
  media(DeviceSmartphones, {
    width: 'calc(100%)',
  }));

const Divider: React.SFC<IDividerProps> = ({ children, ...others }) => {
  return (<hr className={defaultStyles} {...others} />);
};

export default Divider;
