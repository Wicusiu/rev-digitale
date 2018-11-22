import * as React from 'react';
import { style } from 'typestyle';

export interface ScrollableProps {
  children?: Array<React.ReactNode> | React.ReactNode;
}

export const ScrollableStyle = style({
  width: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingBottom: '20px',
  height: 'calc(100%)',
});

const Scrollable = (props: ScrollableProps) => {
  const { children } = props;
  return (
    <div className={ScrollableStyle}>
      {children}
    </div>
  );
};

export default Scrollable;
