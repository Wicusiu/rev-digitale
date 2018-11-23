import * as React from 'react';
import { style } from 'typestyle';
import { colorMap } from 'common/theme/theme';
import * as classnames from 'classnames';

import {
  body1CenterWhite,
} from 'common/theme/styleguide';

import { NestedCSSProperties } from 'typestyle/lib/types';
import { IActionResult } from 'common/actions';

export type AvatarSize = 'icon' | 'small' | 'normal';

const mapSize = {
  icon: '32px',
  small: '40px',
  normal: '144px',
};

const CommonDefaultAvatar: NestedCSSProperties = {
  fontFamily: 'materialinear',
  color: colorMap.brownGrey,
  textAlign: 'center',
};

const DefaultAvatarNormal: NestedCSSProperties = {
  ...CommonDefaultAvatar,
  fontSize: '60px',
  padding: '45px',
  display: 'inline-block',
};

const DefaultAvatarSmall: NestedCSSProperties = {
  ...CommonDefaultAvatar,
  fontSize: '22px',
  padding: '5px',
  paddingTop: '12px',
  width: '48px',
  display: 'inline-block',
};

const DefaultAvatarIcon: NestedCSSProperties = {
  ...CommonDefaultAvatar,
  fontSize: '14px',
  padding: '4px',
  width: '32px',
  height: '32px',
  textAlign: 'center',
  marginTop: '6px',
  display: 'inline-block',
  color: colorMap.white,
};

const AvatarWrapperNormal: NestedCSSProperties = {
  borderRadius: '50%',
  backgroundColor: 'white',
  position: 'relative',
  border: `1px solid ${colorMap.lightGrey}`,
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  $nest: {
    '.up-help-action': {
      display: 'none',
    },
  },
};

const AvatarWrapperWithAction = style({
  $nest: {
    '&:hover': {
      backgroundColor: 'rgba(63, 59, 55, 0.6)',
      cursor: 'pointer',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 8px 16px 0 rgba(0, 0, 0, 0.4)',
    },
    '&:hover .up-help-action': {
      ...body1CenterWhite,
      position: 'absolute',
      top: '50%',
      left: 0,
      display: 'inline-block',
      width: '100%',
      textAlign: 'center',
    },
  },
});

const DefaultAvatarNormalStyle = style(DefaultAvatarNormal);
const DefaultAvatarSmallStyle = style(DefaultAvatarSmall);
const DefaultAvatarIconStyle = style(DefaultAvatarIcon);

const mapSizeToStyle = {
  icon: DefaultAvatarIconStyle,
  small: DefaultAvatarSmallStyle,
  normal: DefaultAvatarNormalStyle,
};

export interface IAvatarAction {
  handleChange: (file) => Promise<IActionResult<any>>;
  libelle: string;
}

export interface IAvatarProps {
  size?: AvatarSize;
  empty?: any;
  photo?: any;
  action?: IAvatarAction;
  className?: string;
  allowedExtensions?: string[];
}

export interface IAvatarState {
  photo?: any;
}

class Avatar extends React.Component<IAvatarProps, IAvatarState> {
  inputFile;
  static defaultProps = {
    size: 'normal',
    photo: '',
    className: '',
    allowedExtensions: null,
  };

  constructor(props: IAvatarProps, context) {
    super(props, context);
    this.state = { photo: props.photo };
  }

  componentWillReceiveProps(nextProps: IAvatarProps) {
    if (this.props.photo !== nextProps.photo) {
      this.setState({ photo: nextProps.photo });
    }
  }

  handleClick = () => {
    const { action } = this.props;
    if (action != null && typeof action.handleChange === 'function') {
      this.inputFile.click();
    }
  }

  onChangePhoto = (event) => {
    const file = event.target.files[0];

    if (file == null) {
      return;
    }

    if (this.props.allowedExtensions && this.props.allowedExtensions.length > 0 && this.props.allowedExtensions.indexOf(file.name.split('.').pop()) === -1) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const photo: any = {
        name: file.name,
        value_base64: reader.result,
      };
      const { action } = this.props;
      if (action != null && typeof action.handleChange === 'function') {
        const lastPhoto = this.state.photo;
        this.setState({ photo: photo.value_base64 }, () => {
          action.handleChange(photo.value_base64).then((result: IActionResult<any>) => {
          }).catch((errors) => {
            console.log(errors);
          });
        });
      }
    };
  }

  setInput = (input) => {
    this.inputFile = input;
  }

  render() {
    const { empty, size, action, className } = this.props;

    let renderPhoto = empty;
    const AvatarCss: NestedCSSProperties = {
      ...AvatarWrapperNormal,
    };

    if (size === 'icon') {
      AvatarCss.display = 'inline-block';
      if (this.state.photo == null) {
        AvatarCss.backgroundColor = 'transparent';
        AvatarCss.border = `0px`;
      }
    }

    if (!renderPhoto) {
      renderPhoto = <span className={classnames(mapSizeToStyle[size], 'icon-Luser')}></span>;
    }

    if (this.state.photo) {
      AvatarCss.backgroundImage = `url('${this.state.photo}')`;
      AvatarCss.backgroundRepeat = 'no-repeat';
      AvatarCss.backgroundPosition = 'center',
        AvatarCss.backgroundSize = '100%';
      renderPhoto = null;
    }

    AvatarCss.width = mapSize[size];
    AvatarCss.height = mapSize[size];

    const classes = [style(AvatarCss)];
    if (className) {
      classes.push(className);
    }
    if (action != null) {
      classes.push(AvatarWrapperWithAction);
    }

    return <div className={classnames(classes)} onClick={this.handleClick}>
      {renderPhoto}
      {action &&
        <>
          <span className="up-help-action">{action.libelle}</span>
          <input style={{ visibility: 'hidden' }} onChange={this.onChangePhoto} ref={this.setInput} type="file" name="avatarImage" accept=".jpg,.jpeg,.png" id="avatarImage" />
        </>
      }
    </div>;
  }
}

export default Avatar;
