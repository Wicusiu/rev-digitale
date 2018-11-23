import * as React from 'react';
import { style, media } from 'typestyle';
import { DeviceSmartphones } from 'common/utils/devices';

interface IMainContentProps {
  children?: React.ReactNode;
}

const mainContent = style({
  width: 'calc(100% - 216px)',
  height: 'calc(100% - 42px)',
  overflowY: 'auto',
  overflowX: 'hidden',
  float: 'left',
},
  media(DeviceSmartphones, {
    width: 'calc(100%)',
  }));

const MainContent: React.SFC<IMainContentProps> = ({ children }) => {
  return (<div className={mainContent} id="MainContent">
    {children}
  </div>);
};

export default MainContent;
