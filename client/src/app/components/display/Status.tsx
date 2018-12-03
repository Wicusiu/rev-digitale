import * as React from 'react';
import { style, media } from 'typestyle';
import { DeviceSmartphones } from 'common/utils/devices';
import { WithThemeProps, UpDefaultTheme, withTheme } from '@up-group/react-controls';
import { IntentType, ThemeInterface } from '@up-group/react-controls/dist/src/Common/theming/types';

interface IStatusProps extends React.HTMLProps<any> {
  children?: React.ReactNode;
  intent: IntentType;
}

const defaultStyles = (props: { intent: IntentType, theme: ThemeInterface }) => style({
  padding: '8px',
  borderRadius: props.theme.borderRadius,
  backgroundColor: props.theme.colorMap[`${props.intent}`],
  color: props.theme.colorMap[`${props.intent}Fg`],
},
  media(DeviceSmartphones, {
    width: 'calc(100%)',
  }));

const Status: React.SFC<IStatusProps & WithThemeProps> = ({ intent, theme = UpDefaultTheme, children, ...others }) => {
  return (<span className={defaultStyles({ intent, theme })} {...others}>
    {children}
  </span>);
};

export default withTheme<IStatusProps>(Status);
