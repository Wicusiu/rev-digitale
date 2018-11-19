import * as React  from 'react';

import { style, media } from 'typestyle';
import { IResultMessage } from 'common/actions';
import Background from './Background';
import { DeviceSmartphones } from 'common/utils/devices';
import { UpBox } from '@up-group/react-controls';

export interface IErrorPageProps {
  children?: any;
  errors?: IResultMessage[];
}
const PageErrorStyle = style({
  height : 'calc(100%)',
  padding: '0% 30%',
}, media(DeviceSmartphones, {
  padding: '20px',
}));

class ErrorPage extends React.Component<IErrorPageProps> {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { children, errors } = this.props;

    return (
      <Background>
          <UpBox className={PageErrorStyle} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            {errors &&
            <div>
              {
                // <UpMessages messages={errors} />
              }
            </div>
            }
            {children &&
            <div>
              {children}
            </div>
            }
          </UpBox>
      </Background>
    );
  }
}

export default ErrorPage;
