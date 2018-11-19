import * as React from 'react';
import { style } from 'typestyle';
import { colorMap } from 'common/theme/theme';
import { UpBox } from '@up-group/react-controls';

const bgSvg = require('../../../assets/img/bg.svg');

interface IBackgroundProps {
  children?: any;
}

const BackgroundStyle = style(
  {
    background: `url('${bgSvg}')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    height: '110vh',
    paddingBottom: '10vh',
    $nest: {
      '@media print': {
        background: colorMap.white,
        overflow: 'hidden',
      },
    },
  });

const Background: React.SFC<IBackgroundProps> = ({ children }) => {
  return <UpBox className={BackgroundStyle}>{children}</UpBox>;
};

export default Background;
