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
import { WithThemeProps, UpBox, UpParagraph, UpButton, withTheme } from '@up-group/react-controls';

type CardDisplayMode = 'card' | 'tooltip';

const CardWrapperStyle = style({
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

const CardContentStyle = style({
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

const CardTitleStyle = style({
  ...headlineRightGreyLevel1,
  margin: '0px',
}, media(DeviceSmartphones, {
  fontSize: '14px',
}));

const CardSubtitleStyle = style({
  ...captionRightGreyLevel2,
  margin: '0px',
}, media(DeviceSmartphones, {
  fontSize: '13px',
}));

const CardAddressStyle = style({
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

export interface CardInfo {
  name: string;
  location?: string;
  phoneNumber?: string;
  description?: string;
  subtitle?: string;
  photo?: string;
  rating?: number;
  websiteLink?: string;
}

export interface ICardProps {
  card: CardInfo;
  navigateToCardView?: (e: React.MouseEvent<any>) => void;
  defaultIcon?: string;
  displayMode?: CardDisplayMode;
  actions?: IAction[];
  publicAccess?: boolean;
}

class Card extends React.Component<ICardProps & WithThemeProps> {

  static defaultProps: Partial<ICardProps> = {
    defaultIcon: 'icon-Lstore',
    displayMode: 'card',
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { name, location, phoneNumber, subtitle, description, photo, websiteLink } = this.props.card;
    const { defaultIcon, displayMode, theme } = this.props;

    const NavigationStyleTheme = style({
      color: theme.colorMap.primary,
      $nest: {
        '&:hover': {
          color: theme.colorMap.primaryDark,
        },
      },
    });

    const SocialInfoStyle = style({
      fontFamily: 'materialinear',
      fontSize: '16px',
      textDecoration: 'none',
      color: this.props.theme.colorMap.primary,
      display: 'inline-block',
      marginRight: '8px',
      $nest: {
        '&:hover': {
          color: this.props.theme.colorMap.primaryDark,
          cursor: 'pointer',
        },
      },
    });

    const URLSiteInfoStyle = style({
      ...body1LeftOrangeLevel1Link,
      margin: '0px',
      cursor: 'pointer',
      display: 'inline-block',
      marginRight: '16px',
      textDecoration: 'none',
      color: this.props.theme.colorMap.primary,
      $nest: {
        '&:visited': {
          color: this.props.theme.colorMap.primary,
        },
        '&:hover': {
          color: this.props.theme.colorMap.primaryDark,
        },
      },
    }, media(DeviceSmartphones, {
      fontSize: '12px',
    }));

    const SocialLinks = (props) => {
      const { facebook_link, twitter_link, instagram_link } = props;
      return <>
        {twitter_link &&
          <a
            onClick={e => e.stopPropagation()}
            className={classnames(SocialInfoStyle, 'icon-twitter')}
            href={absoluteUrl(twitter_link)}
            target="_blank"
          />
        }
        {facebook_link &&
          <a
            onClick={e => e.stopPropagation()}
            className={classnames(SocialInfoStyle, 'icon-facebook')}
            href={absoluteUrl(facebook_link)}
            target="_blank"
          />
        }
        {instagram_link &&
          <a
            onClick={e => e.stopPropagation()}
            className={classnames(SocialInfoStyle, 'icon-instagram')}
            href={absoluteUrl(instagram_link)}
            target="_blank"
          />
        }
      </>;
    };

    return (
      <UpBox
        flexDirection={displayMode === 'card' ? 'row' : 'column'}
        className={classnames(CardWrapperStyle, 'up-card')}
        onClick={this.props.navigateToCardView}
        backgroundColor={colorMap.white}
      >
        {(displayMode === 'card' || photo) &&
          <UpBox className={WrapperLogoStyle}>
            <div className={classnames(displayMode === 'card' ? LogoStyle : HeaderStyle)}
              style={{ background: colorMap.lightGrey }}>
              {photo &&
                <img src={photo} />
              }
              {displayMode === 'card' && !photo &&
                <span className={classnames(style(iconStyle), WrapperIconStyle, defaultIcon)} />
              }
            </div>
          </UpBox>
        }
        <UpBox className={CardContentStyle} flexDirection={'column'}>
          <UpParagraph className={CardTitleStyle}>{name}</UpParagraph>
          {subtitle &&
            <UpParagraph className={CardSubtitleStyle}>{subtitle}</UpParagraph>
          }
          {location &&
            <UpParagraph className={CardAddressStyle}>{location}</UpParagraph>
          }
          {phoneNumber &&
            <UpParagraph className={PhoneInfoStyle}>
              <a href={`tel:${phoneNumber}`}>
                {phoneNumber}
              </a>
            </UpParagraph>
          }
          {websiteLink &&
            <UpParagraph className={LinksInfoStyle}>
              <a className={URLSiteInfoStyle}
                onClick={e => e.stopPropagation()}
                href={absoluteUrl(websiteLink)}
                target="_blank"
              >
                {websiteLink}
              </a>
              {displayMode === 'card' &&
                <SocialLinks {...this.props.card} />
              }
            </UpParagraph>
          }
          {description && displayMode === 'card' &&
            <UpParagraph className={DescriptionStyle}>
              {description}
            </UpParagraph>
          }
        </UpBox>
        {this.props.navigateToCardView &&
          <span className={classnames(NavigationStyle, NavigationStyleTheme, 'icon-arrow_forward')} />
        }
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
    );
  }
}

export default withTheme<ICardProps>(Card);
