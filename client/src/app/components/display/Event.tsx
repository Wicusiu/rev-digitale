import * as React from 'react';

import { colorMap, iconStyle, ThemeProps } from 'common/theme/theme';
import {
  body1RightGreyLevel1,
  card,
  headlineRightGreyLevel1,
  captionRightGreyLevel2,
  body1LeftOrangeLevel1Link,
  body1RightWhite,
} from 'common/theme/styleguide';

import { style, media } from 'typestyle';
import * as classnames from 'classnames';

import { DeviceSmartphones } from 'common/utils/devices';
import { absoluteUrl } from 'common/utils';
import { IAction } from 'common/actions';
import { WithThemeProps, UpBox, UpParagraph, UpButton, withTheme, UpSvgIcon } from '@up-group/react-controls';
import DateFormatter from './DateFormatter';

type EventDisplayMode = 'card' | 'tooltip';

const EventWrapperStyle = style({
  position: 'relative',
  ...card,
  width: '100%',
  backgroundColor: colorMap.white,
  $nest: {
    '&.up-card': {
      marginBottom: '20px',
    },
  },
}, media(DeviceSmartphones, {
  marginBottom: '10px',
}));

const EventContentStyle = style({
  margin: '24px 56px 24px 24px',
  backgroundColor: colorMap.white,
  $nest: {
    p: {
      margin: '8px 8px',
      color: 'black',
      textAlign: 'left',
    },
  },
}, media(DeviceSmartphones, {
  margin: '8px',
}));

const EventTitleStyle = style({
  ...headlineRightGreyLevel1,
  margin: '0px',
}, media(DeviceSmartphones, {
  fontSize: '14px',
}));

const EventSubtitleStyle = style({
  ...captionRightGreyLevel2,
  margin: '0px',
}, media(DeviceSmartphones, {
  fontSize: '13px',
}));

const EventAddressStyle = style({
  ...body1RightGreyLevel1,
  margin: '10px 0px',
}, media(DeviceSmartphones, {
  fontSize: '12px',
  margin: '0px',
  marginTop: '4px',
}));

const DescriptionStyle = style({
  ...body1RightGreyLevel1,
  position: 'relative',
  margin: '0px',
  marginTop: '16px',
});

const WrapperLogoStyle = style({
  position: 'relative',
});

const LogoStyle = style({
  position: 'relative',
  width: '180px',
  height: '180px',
  overflow: 'hidden',
  backgroundColor: '#DDD',
  $nest: {
    img: {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
    },
  },
}, media(DeviceSmartphones, {
  width: '80px',
  height: '80px',
}));

const HeaderStyle = style({
  height: '80px',
  maxWidth: '100%',
});

const wrapperActionsStyle = style({
  margin: '12px',
  position: 'absolute',
  right: 0,
  bottom: 0,
});

const actionButtonStyle = style({
  paddingLeft: '16px',
});

const NavigationStyle = style({
  position: 'absolute',
  bottom: '24px',
  right: '24px',
  fontFamily: 'materailinear',
  textDecoration: 'none',
  fontSize: '16px',
  $nest: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'none',
    },
  },
}, media(DeviceSmartphones, {
  bottom: '5px',
  right: '5px',
}));

const WrapperIconStyle = style({
  position: 'absolute',
  top: '55px',
  left: '55px',
  fontSize: '100px',
  color: colorMap.brownGrey,
}, media(DeviceSmartphones, {
  top: '10px',
  left: '10px',
  fontSize: '60px',
}));

const PhoneInfoStyle = style({
  margin: '0px',
  marginBottom: '8px',
  $nest: {
    a: {
      ...body1RightWhite,
      textDecoration: 'none',
    },
  },
  whiteSpace: 'nowrap',
}, media(DeviceSmartphones, {
  fontSize: '12px',
}));

const LinksInfoStyle = style({
  margin: '0px',
  overflow: 'hidden',
});

export interface EventInfo {
  name: string;
  location?: string;
  phoneNumber?: string;
  description?: string;
  subtitle?: string;
  photo?: string;
  rating?: number;
  websiteLink?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface IEventProps {
  event: EventInfo;
  defaultIcon?: string;
  displayMode?: EventDisplayMode;
  actions?: IAction[];
  className?: string;
  navigateToEventView?: (e: React.MouseEvent<any>) => void;
}

class Event extends React.Component<IEventProps & WithThemeProps> {

  static defaultProps: Partial<IEventProps> = {
    defaultIcon: 'icon-Event',
    displayMode: 'card',
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { name, location, phoneNumber, subtitle, description, photo, websiteLink, startDate, endDate } = this.props.event;
    const { defaultIcon, displayMode, theme, className, children } = this.props;

    const NavigationStyleTheme = style({
      color: theme.colorMap.primary,
      $nest: {
        '&:hover': {
          color: theme.colorMap.primaryDark,
        },
      },
    });
    return (
      <UpBox
        flexDirection={displayMode === 'card' ? 'row' : 'column'}
        className={classnames(EventWrapperStyle, className, 'up-card')}
        onClick={this.props.navigateToEventView}
        backgroundColor={colorMap.white}
      >
        <div className={LogoStyle}>
          <UpBox flexDirection={'row'}>
            <UpSvgIcon width={50} style={{ margin: '10px' }} color={this.props.theme.colorMap.primary} iconName={'calendar'} />
            <UpBox flexDirection={'column'}>
              <div style={{
                margin: '10px', fontSize: '18px',
                color: this.props.theme.colorMap.primary, fontWeight: 500,
              }}>
                <DateFormatter date={startDate} />
              </div>
            </UpBox>
          </UpBox>
        </div>
        <UpBox className={EventContentStyle} flexDirection={'column'}>
          <UpParagraph className={EventTitleStyle}>{name}</UpParagraph>
          {subtitle &&
            <UpParagraph className={EventSubtitleStyle}>{subtitle}</UpParagraph>
          }
          {location &&
            <UpBox flexDirection={'row'}>
              <UpSvgIcon color={this.props.theme.colorMap.primary} iconName={'location'} />
              <UpParagraph className={EventAddressStyle}>{location}</UpParagraph>
            </UpBox>
          }
          {description && displayMode === 'card' &&
            <UpParagraph className={DescriptionStyle}>
              {description}
            </UpParagraph>
          }
          {this.props.navigateToEventView &&
            <span className={classnames(NavigationStyle, NavigationStyleTheme, 'icon-arrow_forward')} />
          }
          {children}
          {this.props.actions &&
            <div className={wrapperActionsStyle}>
              {this.props.actions.map((action) => {
                return <UpButton
                  key={action.label}
                  theme={this.props.theme}
                  disabled={action.disabled}
                  actionType={action.type}
                  intent={action.intent}
                  width={'icon'}
                  onClick={action.execute}
                  tooltip={action.tooltip}>{action.label}</UpButton>;
              })}
            </div>
          }
        </UpBox>
      </UpBox>
    );
  }
}

export default withTheme<IEventProps>(Event);
