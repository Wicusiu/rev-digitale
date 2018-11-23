import * as React from 'react';
import { Brick } from 'app/api/mapper/swagger/typescript-fetch-client';
import { WithThemeProps, UpBox, UpLoadingIndicator, UpNotification } from '@up-group/react-controls';
import { RouteComponentProps } from 'react-router';
import { IUser } from 'app/business/user/User';
import Card, { CardInfo } from 'app/components/display/Card';

export interface IBricksComponentProps {
  isFetching?: boolean;
  bricks?: Array<Brick>;
  authenticatedUser?: IUser;
  getBricks?: (authToken: string) => Promise<Array<Brick>>;
}

class ListBrickComponent extends React.Component<IBricksComponentProps & WithThemeProps & RouteComponentProps<any, {}>> {

  static defaultProps: IBricksComponentProps = {

  };

  componentDidMount() {
    // Récupération des bricks
    this.props.getBricks(this.props.authenticatedUser.token);
  }

  render() {
    if (this.props.isFetching) {
      return <UpBox flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <UpLoadingIndicator isLoading={true} />
      </UpBox>;
    }
    if (this.props.bricks) {
      return <div>
        <UpNotification>
          Les bricks disponibles
        </UpNotification>
        {this.props.bricks.map((brick: Brick) => {
          const card: CardInfo = {
            description: brick.description,
            name: brick.name,
            photo: brick.logo,
          };
          return <Card card={card} ></Card>;
        })
        }
      </div>;
    }

    return null;
  }
}

export default ListBrickComponent;
