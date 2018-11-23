import * as React from 'react';
import { style, media } from 'typestyle';
import { DeviceSmartphones } from 'common/utils/devices';

const bgSvg = require('../../../../assets/img/bg.svg');

interface IMainContentProps {
  children?: React.ReactNode;
}

const mainContent = style({
  width: 'calc(100% - 216px)',
  height: 'calc(100% - 42px)',
  overflowY: 'auto',
  overflowX: 'hidden',
  float: 'left',
  background: `url('data:image/svg+xml;utf8,${bgSvg}')`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  $nest: {
    '@media print': {
      background: 'white',
      overflow: 'hidden',
    },
  },
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
