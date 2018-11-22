import * as React from 'react';
import { style, media } from 'typestyle';
import remStringFromPx from 'common/utils/remStringFromPx';
import { DeviceSmartphones } from 'common/utils/devices';
import { UpBox, UpSvgIcon } from '@up-group/react-controls';

const bgLoginBoxStyle = style({
  $nest: {
    '&.up-responsive-box': {
      width: remStringFromPx(472),
      borderRadius: remStringFromPx(4),
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
},
  media(DeviceSmartphones, {
    width: '100%',
  }));

const logoStyle = style({
  maxWidth: '100%',
  maxHeight: '230px',
  marginLeft: 'auto',
  paddingTop: remStringFromPx(40),
  marginRight: 'auto',
  display: 'block',
});

const genericPublicTextStyle = style({
  fontFamily: 'Roboto',
  fontSize: remStringFromPx(24),
  fontWeight: 'bold',
  lineHeight: '1.36',
  textAlign: 'center',
  color: '#3f3b37',
  marginLeft: 'auto',
  marginTop: remStringFromPx(24),
  marginRight: 'auto',
});

const boxContainerStyle = style({
  marginTop: remStringFromPx(40),
  paddingLeft: '2em',
  paddingRight: '2em',
  width: '100%',
});

export interface ResponsiveBoxProps {
  message: string | React.ReactElement<any>;
  logoUrl?: string;
}

class ResponsiveBox extends React.Component<ResponsiveBoxProps> {

  render() {
    const {
      children,
      message,
      logoUrl,
    } = this.props;

    return (
      <UpBox className={`${bgLoginBoxStyle} up-responsive-box`}>
        <div className={logoStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="104" height="104" viewBox="0 0 104 104">
            <g fill="none" fill-rule="evenodd">
              <path fill="#FEFEFE" d="M0 104h104V0H0z" />
              <path fill="#F39301" d="M17.155 85.773h68.618V17.155H17.155z" />
              <g fill="#FEFEFE">
                <path d="M45.051 50.878c0 3.482-.79 6.156-4.825 6.156-4.518 0-5-3.142-5-5.69v-19.96l-5.792 1.236v19.532c0 7.43 5.352 10.275 10.529 10.275 6.756 0 10.879-4.204 10.879-9.469V31.384l-5.79 1.236v18.258zM65.09 57.502c-3.729 0-6.449-3.015-6.449-6.54 0-3.524 2.72-6.538 6.448-6.538 3.73 0 6.45 3.014 6.45 6.539 0 3.524-2.72 6.539-6.45 6.539m.357-17.982c-2.333 0-4.459.683-6.263 1.897v-3.175l-5.587 1.308v29.84l5.571-1.236v-7.637a11.254 11.254 0 0 0 6.279 1.906c6.278 0 11.367-5.127 11.367-11.452 0-6.324-5.09-11.45-11.367-11.45" />
              </g>
            </g>
          </svg>
        </div>
        {
          <div className={genericPublicTextStyle}>
            {message}
          </div>
        }
        <div className={boxContainerStyle}>
          {children}
        </div>
      </UpBox>
    );
  }
}

export default ResponsiveBox;
