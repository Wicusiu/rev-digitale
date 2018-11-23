import * as React from 'react';
import { Brick } from 'app/api/mapper/swagger/typescript-fetch-client';
import { WithThemeProps, UpBox, UpLoadingIndicator } from '@up-group/react-controls';
import { RouteComponentProps } from 'react-router';
import { isEmpty } from 'common/utils';
import { IUser } from 'app/business/user/User';

export interface IViewBrickComponentProps {
  authenticatedUser?: IUser;
  isFetching?: boolean;
  brick?: Brick;
  brickId: string;

  navigateTo?: (route: string) => void;
  read?: (authToken: string, id: string) => void;
}

class ViewBrickComponent extends React.Component<IViewBrickComponentProps & WithThemeProps & RouteComponentProps<any, { id?: string }>> {

  static defaultProps: IViewBrickComponentProps = {
    brickId: null,
  };

  componentDidMount() {
    // Récupération de la brick
    if (isEmpty(this.props.brickId)) {
      this.props.navigateTo('/404');
    } else {
      this.props.read(this.props.authenticatedUser.token, this.props.brickId);
    }
  }

  render() {
    if (this.props.isFetching) {
      return <UpBox flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <UpLoadingIndicator isLoading={true} />
      </UpBox>;
    }
    if (this.props.brick) {
      return <div>
        Ma Brick
      </div>;
    }

    return null;
  }
}

export default ViewBrickComponent;
