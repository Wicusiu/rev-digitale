import * as React from 'react';
import { style } from 'typestyle';
import { colorMap } from 'common/theme/theme';
import { UpBox } from '@up-group/react-controls';
import { center } from 'csstips';

const bgPng = require('../../../assets/img/background.png');

interface IBackgroundProps {
  children?: any;
  backgroundUrl?: string;
}

const Background: React.SFC<IBackgroundProps> = ({ children, backgroundUrl }) => {

  const BackgroundStyle = style(
    {
      background: `url('${backgroundUrl == null ? bgPng : backgroundUrl}')`,
      backgroundSize: 'cover',
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

  return <UpBox className={BackgroundStyle} justifyContent={'center'} alignItems={'center'}>
    {children}
  </UpBox>;
};

export default Background;
