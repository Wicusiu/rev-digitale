import * as React from 'react';
import { style, media } from 'typestyle';
import {
  body1RightGreyLevel1,
  body1CenterGreyLevel1,
} from 'common/theme/styleguide';

import { colorMap } from 'common/theme/theme';
import { NestedCSSProperties } from 'typestyle/lib/types';
import remStringFromPx from 'common/utils/remStringFromPx';
import { DeviceSmartphones } from 'common/utils/devices';
import { color } from 'csx/lib';
import { WithThemeProps, UpBox } from '@up-group/react-controls';

const endFooter = style({
  margin: '1rem auto',
  paddingTop: remStringFromPx(40),
  clear: 'both',
  $nest: {
    p: {
      textAlign: 'center',
      lineHeight: remStringFromPx(24),
    },
  },
});

const wrapperAppMobileInfoStyle = style({
  float: 'left',
  width: '100%',
  marginTop: remStringFromPx(80),
});

interface IFooterViewProps {
  redirect: (path: string) => void;
  displayInfoMobileApp?: boolean;
  className?: string;
  mobilePictureUrl?: string;
  descriptionAppMobile?: string;
  nameAppMobile?: string;
}

const FooterView: React.SFC<IFooterViewProps & WithThemeProps> = (props) => {
  return (
    <>
      {props.displayInfoMobileApp &&
        <div className={wrapperAppMobileInfoStyle}>
        </div>
      }
      <UpBox className={endFooter} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
        <p className={style(body1RightGreyLevel1, { color: 'white' })}>
          <span>© {new Date().getFullYear()} - Tous droits réservés Up (R)evolution Digitale.</span>
          <span> </span>
        </p>
      </UpBox>
    </>
  );
};

// const themedFooter = withTheme()<IFooterViewProps>(FooterView);
export default FooterView;
