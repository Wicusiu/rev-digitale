// Import React
import * as React from 'react';
// Import the type style
import { style } from 'typestyle';
// Import classnames
import * as cn from 'classnames';
import { UpBoxProps } from '@up-group/react-controls/dist/src/Components/Containers/Box/UpBox';
import { UpBox } from '@up-group/react-controls';

export type Alignment = 'left' | 'middle' | 'right';

export interface IActionsProps {
  align: Alignment,
}

class Actions extends React.Component<IActionsProps> {

  static defaultProps = {
    align: 'right',
  };

  constructor(props, context) {
    super(props, context);
  }

  getMargins = () => {
    return {
      marginLeft: this.props.align === 'right' ? '16px' : '0px',
      marginRight: this.props.align === 'left' ? '16px' : '0px',
      marginTop: '8px',
      marginBottom: '8px',
    };
  }

  render() {

    const wrapperActionsStyle = style({
      $nest: {
        '&>*': {
          ...this.getMargins(),
        },
      },
    });

    const { children } = this.props;

    const boxProps: UpBoxProps = {
      className: wrapperActionsStyle,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    };

    return <UpBox {...boxProps}>
      {children}
    </UpBox>;
  }
}

export default Actions;
