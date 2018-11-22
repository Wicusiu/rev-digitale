import * as React from 'react';
import { style } from 'typestyle';
import { colorMap } from 'common/theme/theme';
import { UpBox } from '@up-group/react-controls';
import { center } from 'csstips';

const bgSvg = require('../../../assets/img/bg.svg');

interface IBackgroundProps {
  children?: any;
}

const BackgroundStyle = style(
  {
    background: `url('data:image/svg+xml;utf8,${bgSvg}')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    height: '110vh  !important',
    paddingBottom: '10vh !important',
    $nest: {
      '@media print': {
        background: colorMap.white,
        overflow: 'hidden',
      },
    },
  });

const Background: React.SFC<IBackgroundProps> = ({ children }) => {
  return <UpBox className={BackgroundStyle} justifyContent={'center'} alignItems={'center'}>
    {children}
  </UpBox>;
};

export default Background;
