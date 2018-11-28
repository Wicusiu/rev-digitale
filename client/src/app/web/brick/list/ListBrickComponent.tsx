import * as React from 'react';
import { Brick } from 'app/api/mapper/swagger/typescript-fetch-client';
import { WithThemeProps, UpBox, UpLoadingIndicator, UpNotification } from '@up-group/react-controls';
import { RouteComponentProps } from 'react-router';
import { IUser } from 'app/business/user/User';
import Card, { CardInfo } from 'app/components/display/Card';

import Page from '../../../components/container/Page';
import { appearFromBottom, fadeIn } from 'common/animations';
import { style } from 'typestyle';

export interface IBricksComponentProps {
  isFetching?: boolean;
  bricks?: Array<Brick>;
  authenticatedUser?: IUser;
  getBricks?: (authToken: string) => Promise<Array<Brick>>;
  viewBrick?: (id: string) => void;
}

class ListBrickComponent extends React.Component<IBricksComponentProps & WithThemeProps & RouteComponentProps<any, {}>> {

  static defaultProps: IBricksComponentProps = {
    isFetching: true,
  };

  componentDidMount() {
    if (this.props.authenticatedUser) {
      // Récupération des bricks
      this.props.getBricks(this.props.authenticatedUser.token);
    }
  }

  render() {
    if (this.props.isFetching) {
      return <UpBox flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <UpLoadingIndicator displayMode={'layer'} message={'Chargement en cours...'} isLoading={true} />
      </UpBox>;
    }
    if (this.props.bricks) {
      return <Page title="Les briques disponibles" titleStyle={{ color: 'white !important' }}>
        {this.props.bricks.map((brick: Brick) => {
          const card: CardInfo = {
            description: brick.description,
            name: brick.name,
            photo: brick.logo,
          };
          return <div className={style((appearFromBottom(1, 'ease')))}>
            <Card key={brick.id} card={card} className={style((fadeIn(2, 'ease')))} actions={[
              {
                execute: () => this.props.viewBrick(brick.id),
                intent: 'primary',
                type: 'read',
                label: 'Voir',
              },
            ]}></Card></div>;
        })
        }
      </Page>;
    }
    return null;
  }
}

export default ListBrickComponent;
