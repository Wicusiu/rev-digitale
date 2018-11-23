import * as React from 'react';

import { style, media } from 'typestyle';
import { titleLevel1 } from 'common/theme/styleguide';

import * as classnames from 'classnames';
import { DeviceSmartphones } from 'common/utils/devices';
import { UpHeading } from '@up-group/react-controls';

const PageWrapperStyle = style({
  marginLeft: '8%',
  marginRight: '8%',
  marginTop: '24px',
},
  media(DeviceSmartphones, {
    margin: '10px',
  }));

const TitleStyle = style({
  ...titleLevel1,
  margin: '0px 0px 24px 0px',
},
  media(DeviceSmartphones, {
    fontSize: '18px',
    marginBottom: '12px',
  }));

interface IPageProps {
  title?: string;
  titleStyle?: React.CSSProperties;
  children?: React.ReactNode;
  rawContent?: string;
  className?: string;
}

const Page: React.SFC<IPageProps> = ({ title, children, rawContent, className, titleStyle }) => {
  return (
    <section className={classnames(PageWrapperStyle, className)}>
      {title &&
        <UpHeading tag={'h1'} className={classnames(TitleStyle, style(titleStyle))}>{title}</UpHeading>
      }
      <div>
        {rawContent && (
          <div
            dangerouslySetInnerHTML={{
              __html: rawContent,
            }}
          />
        )}
        {!rawContent && children}
      </div>
    </section>
  );
};

export default Page;
