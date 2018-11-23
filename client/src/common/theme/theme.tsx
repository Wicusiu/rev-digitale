import * as React from 'react';
import * as classnames from 'classnames';
import { style } from 'typestyle';
import { color } from 'csx';

import { NestedCSSProperties } from 'typestyle/lib/types';
import { ActionType } from 'common/actions';

export interface ThemeColorMap {
  tangerine: string;
  pumpkine: string;
  greyishBrown: string;
  QR: string;
  brownGrey: string;
  pinkishGrey: string;
  lightGrey: string;
  paleGrey: string;
  white: string;
  turquoiseBlue: string;
  oceanBlue: string;
  paleRed: string;
  boringGreen: string;
  tangerine10: string;
  turquoiseDark: string;
  paleYellow: string;
  social: string;
  socialDark: string;
}

export interface ThemeIntentMap {
  default: string;
  defaultBorder: string | null;
  defaultHoverBorder: string | null;
  defaultFg: string;
  defaultDark: string;
  defaultHoverActive: string;
  defaultHover: string;
  defaultHoverFg: string;
  primary: string;
  primaryBorder: string | null;
  primaryHoverBorder: string | null;
  primaryFg: string;
  primaryDark: string;
  primaryHover: string;
  primaryHoverActive: string;
  primaryHoverFg: string;
  info: string;
  infoBorder: string | null;
  infoHoverBorder: string | null;
  infoFg: string;
  infoDark: string;
  infoHover: string;
  infoHoverActive: string;
  infoHoverFg: string;
  secondary: string;
  secondaryBorder: string | null;
  secondaryHoverBorder: string | null;
  secondaryFg: string;
  secondaryDark: string;
  secondaryHover: string;
  secondaryHoverActive: string;
  secondaryHoverFg: string;
  social: string;
  socialBorder: string;
  socialHoverBorder: string;
  socialFg: string;
  socialDark: string;
  socialHover: string;
  socialHoverActive: string;
  socialHoverFg: string;
  success: string;
  successBorder: string;
  successHoverBorder: string;
  successFg: string;
  successDark: string;
  successHover: string;
  successHoverActive: string;
  successHoverFg: string;

  warning: string;
  warningBorder: string;
  warningHoverBorder: string;
  warningFg: string;
  warningDark: string;
  warningHover: string;
  warningHoverActive: string;
  warningHoverFg: string;

  danger: string;
  dangerBorder: string;
  dangerHoverBorder: string;
  dangerFg: string;
  dangerDark: string;
  dangerHover: string;
  dangerHoverActive: string;
  dangerHoverFg: string;
}

export const colorMap: ThemeColorMap = {
  tangerine: '#f39100',
  pumpkine: '#ee7f01',
  greyishBrown: '#3f3b37',
  QR: '#3f3b37',
  brownGrey: '#7a756f',
  pinkishGrey: '#ccc8c5',
  lightGrey: '#eaeae9',
  paleGrey: '#979797',
  white: '#ffffff',
  turquoiseBlue: '#039eb2',
  oceanBlue: '#0360a8',
  paleRed: '#d9534f',
  boringGreen: '#5cb85c',
  tangerine10: '#f39100',
  turquoiseDark: '#0e8c9b',
  paleYellow: '#f8f1ad',
  social: '#507cc0',
  socialDark: '#4c70a7',
};

export const intentMap: ThemeIntentMap = {
  default: colorMap.white,
  defaultBorder: colorMap.pinkishGrey,
  defaultHoverBorder: colorMap.pinkishGrey,
  defaultFg: colorMap.pinkishGrey,
  defaultDark: colorMap.brownGrey,
  defaultHoverActive: colorMap.brownGrey,
  defaultHover: colorMap.brownGrey,
  defaultHoverFg: colorMap.white,

  primary: colorMap.tangerine,
  primaryBorder: colorMap.tangerine,
  primaryHoverBorder: colorMap.tangerine,
  primaryFg: colorMap.white,
  primaryDark: colorMap.pumpkine,
  primaryHover: colorMap.pumpkine,
  primaryHoverActive: colorMap.pumpkine,
  primaryHoverFg: colorMap.white,

  info: colorMap.turquoiseBlue,
  infoBorder: colorMap.turquoiseDark,
  infoHoverBorder: color(colorMap.turquoiseDark).darken(0.1).toHexString(),
  infoFg: colorMap.white,
  infoDark: color(colorMap.turquoiseDark).darken(0.1).toHexString(),
  infoHover: color(colorMap.turquoiseDark).darken(0.1).toHexString(),
  infoHoverActive: color(colorMap.turquoiseDark).darken(0.1).toHexString(),
  infoHoverFg: colorMap.white,

  secondary: colorMap.brownGrey,
  secondaryBorder: colorMap.greyishBrown,
  secondaryHoverBorder: colorMap.greyishBrown,
  secondaryFg: colorMap.white,
  secondaryDark: colorMap.greyishBrown,
  secondaryHover: colorMap.greyishBrown,
  secondaryHoverActive: colorMap.greyishBrown,
  secondaryHoverFg: colorMap.white,

  social: colorMap.social,
  socialBorder: colorMap.socialDark,
  socialHoverBorder: color(colorMap.socialDark).darken(0.1).toHexString(),
  socialFg: colorMap.white,
  socialDark: color(colorMap.socialDark).darken(0.1).toHexString(),
  socialHover: color(colorMap.socialDark).darken(0.1).toHexString(),
  socialHoverActive: color(colorMap.socialDark).darken(0.1).toHexString(),
  socialHoverFg: colorMap.white,

  warning: colorMap.tangerine10,
  warningBorder: colorMap.tangerine10,
  warningHoverBorder: color(colorMap.tangerine10).darken(0.1).toHexString(),
  warningFg: colorMap.white,
  warningDark: color(colorMap.tangerine10).darken(0.1).toHexString(),
  warningHover: color(colorMap.tangerine10).darken(0.1).toHexString(),
  warningHoverActive: color(colorMap.tangerine10).darken(0.1).toHexString(),
  warningHoverFg: colorMap.white,

  success: colorMap.boringGreen,
  successBorder: colorMap.boringGreen,
  successHoverBorder: color(colorMap.boringGreen).darken(0.1).toHexString(),
  successFg: colorMap.white,
  successDark: color(colorMap.boringGreen).darken(0.1).toHexString(),
  successHover: color(colorMap.boringGreen).darken(0.1).toHexString(),
  successHoverActive: color(colorMap.boringGreen).darken(0.1).toHexString(),
  successHoverFg: colorMap.white,

  danger: colorMap.paleRed,
  dangerBorder: colorMap.paleRed,
  dangerHoverBorder: color(colorMap.paleRed).darken(0.1).toHexString(),
  dangerFg: colorMap.white,
  dangerDark: color(colorMap.paleRed).darken(0.1).toHexString(),
  dangerHover: color(colorMap.paleRed).darken(0.1).toHexString(),
  dangerHoverActive: color(colorMap.paleRed).darken(0.1).toHexString(),
  dangerHoverFg: colorMap.white,
};

export interface AppTheme {
  colorMap: ThemeColorMap;
  intentMap: ThemeIntentMap;
  actionMap: { [key in ActionType]: string; };
  borderRadius?: string;
  minButtonSize?: string;
  notificationIconSize?: number;
  gridGutter?: number;
}

export interface ThemeProps {
  theme?: AppTheme
}

const mapActionIcon: { [key in ActionType]: string; } = {
  read: 'icon-visibility',
  edit: 'icon-mode_edit',
  delete: 'icon-delete',
  add: 'icon-add_box',
  open: 'icon-open_in_new ',
  filter: 'icon-Lfunnel ',
  export: 'icon-Lfile-spreadsheet',
  document: 'icon-Ldocument',
  send: 'icon-Lenvelope',
  search: 'icon-Lsearch',
  cancel: 'icon-backspace',
  save: 'icon-save',
};

export const createTheme = (app: any): AppTheme => {
  const primaryColor = app != null && app.primary_color ? app.primary_color : colorMap.tangerine;
  const secondaryColor = app != null && app.secondary_color ? app.secondary_color : colorMap.greyishBrown;

  const muiTheme = {
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
    palette: {
      primary: {
        light: color(primaryColor).lighten(0.1).toHexString(),
        main: primaryColor,
        500: primaryColor,
        dark: color(primaryColor).darken(0.1).toHexString(),
        contrastText: '#fff',
      },
      secondary: {
        light: color(secondaryColor).lighten(0.1).toHexString(),
        main: color(secondaryColor).toHexString(),
        500: secondaryColor,
        dark: color(secondaryColor).darken(0.1).toHexString(),
        contrastText: '#000',
      },
    },
  };
  let themedIntentMap: ThemeIntentMap;

  if (app != null) {
    themedIntentMap = {
      ...intentMap,
      primary: primaryColor,
      primaryBorder: primaryColor,
      primaryHoverBorder: primaryColor,
      primaryFg: colorMap.white,
      primaryDark: color(primaryColor).darken(0.1).toHexString(),
      primaryHover: color(primaryColor).darken(0.1).toHexString(),
      primaryHoverActive: color(primaryColor).darken(0.1).toHexString(),
      primaryHoverFg: colorMap.white,
      secondary: secondaryColor,
      secondaryBorder: null,
      secondaryHoverBorder: null,
      secondaryFg: colorMap.white,
      secondaryDark: color(secondaryColor).darken(0.1).toHexString(),
      secondaryHover: color(secondaryColor).darken(0.1).toHexString(),
      secondaryHoverActive: color(secondaryColor).darken(0.1).toHexString(),
      secondaryHoverFg: colorMap.white,
    };
  } else {
    themedIntentMap = {
      ...intentMap,
    };
  }

  const appTheme: any = {
    ...muiTheme,
    colorMap,
    intentMap: themedIntentMap,
    gridGutter: 30,
    actionMap: mapActionIcon,
  };

  return appTheme;
};

export const DefaultTheme: AppTheme = createTheme(null);

export const iconStyle: NestedCSSProperties = {
  display: 'inline-block',
  fontFamily: 'materialinear',
};

export const defaultIconStyle = style(iconStyle);

export const normalIconActionStyle: NestedCSSProperties = {
  fontSize: '24px',
  cursor: 'pointer',
};

export const getActionIconStyle = (theme: any): string => {
  return style({
    ...iconStyle,
    ...normalIconActionStyle,
    color: theme.palette.primary.main,
    $nest: {
      '&:hover': {
        color: theme.palette.primary.dark,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  });
};

export const getActionIconSelectedStyle = (theme: any): string => style({
  color: theme.palette.primary.dark,
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
});

export const getSmallOvaleStyle = (theme: any): NestedCSSProperties => {
  return {
    width: '44px',
    height: '44px',
    borderRadius: '100px',
    backgroundColor: theme.palette.primary.main,
  };
};

export interface ColorPalette {
  fg: string;
  bg: string;
}

const mapIntentColor = {
  default: { fg: colorMap.brownGrey, bg: color(colorMap.brownGrey).lighten('60%').toHexString() },
  info: { fg: colorMap.turquoiseBlue, bg: color(colorMap.turquoiseBlue).lighten('60%').toHexString() },
  error: { fg: colorMap.paleRed, bg: '#fbeded' },
  danger: { fg: colorMap.paleRed, bg: '#fbeded' },
  warning: { fg: colorMap.tangerine10, bg: color(colorMap.tangerine10).lighten('50%').toHexString() },
  success: { fg: colorMap.boringGreen, bg: '#eef7ee' },
};

const mapIntentIconClass = {
  default: 'icon-donut_large',
  info: 'icon-info',
  error: 'icon-Lexclamation',
  danger: 'icon-Lexclamation',
  warning: 'icon-Lwarning',
  success: 'icon-Lcheck',
};

const mapIntentIcon = {
  default: <span className={classnames(defaultIconStyle, mapIntentIconClass['default'])}></span>,
  info: <span className={classnames(defaultIconStyle, mapIntentIconClass['info'])}></span>,
  danger: <span className={classnames(defaultIconStyle, mapIntentIconClass['danger'])}></span>,
  error: <span className={classnames(defaultIconStyle, mapIntentIconClass['error'])}></span>,
  warning: <span className={classnames(defaultIconStyle, mapIntentIconClass['warning'])}></span>,
  success: <span className={classnames(defaultIconStyle, mapIntentIconClass['success'])}></span>,
};

export const getIntentColor = (intent): ColorPalette => {
  return mapIntentColor.hasOwnProperty(intent) ? mapIntentColor[intent] : null;
};

export const getIntentIcon = (intent): React.ReactNode => {
  return mapIntentIcon.hasOwnProperty(intent) ? mapIntentIcon[intent] : null;
};

export const getIntentIconClass = (intent): React.ReactNode => {
  return mapIntentIconClass.hasOwnProperty(intent) ? mapIntentIconClass[intent] : null;
};

export const getIntentStyle = (intent): any => {
  return {
    color: mapIntentColor[intent].fg,
    backgroundColor: mapIntentColor[intent].bg,
    $nest: {
      p: {
        color: mapIntentColor[intent].fg,
      },
    },
  };
};

export const getHoverColor = (hexaColor: string) => color(hexaColor).darken('10%').toHexString();
