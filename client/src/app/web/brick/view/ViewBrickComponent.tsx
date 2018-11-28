import * as React from 'react';
import { Brick, Module } from 'app/api/mapper/swagger/typescript-fetch-client';
import { WithThemeProps, UpBox, UpLoadingIndicator, UpNotification } from '@up-group/react-controls';
import { RouteComponentProps } from 'react-router';
import { isEmpty } from 'common/utils';
import { IUser } from 'app/business/user/User';
import Page from 'app/components/container/Page';
import Card, { CardInfo } from 'app/components/display/Card';
import { style } from 'typestyle';
import { fadeIn, appearFromBottom } from 'common/animations';

export interface IViewBrickComponentProps {
  authenticatedUser?: IUser;
  isFetching?: boolean;
  brick?: Brick;
  modules?: Array<Module>;
  brickId: string;

  navigateTo?: (route: string) => void;
  read?: (authToken: string, id: string) => void;
  getModules?: (authToken: string, id: string) => void;
  viewModule?: (id: string) => void;
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
      // Lecture de la description de la brique
      this.props.read(this.props.authenticatedUser.token, this.props.brickId);
      // Lecture des modules de la brique
      this.props.getModules(this.props.authenticatedUser.token, this.props.brickId);
    }
  }

  render() {
    if (this.props.isFetching) {
      return <UpBox flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <UpLoadingIndicator displayMode={'layer'} message={'Chargement en cours...'} isLoading={true} />
      </UpBox>;
    }
    if (this.props.brick) {
      return <Page title={this.props.brick.name} titleStyle={{ color: 'white !important' }}>
        <UpNotification>
          {this.props.brick.description}
        </UpNotification>
        {this.props.modules && this.props.modules.map((mod: Module) => {
          const card: CardInfo = {
            description: mod.description,
            name: mod.name,
            photo: mod.logo,
          };
          return <div className={style((appearFromBottom(1, 'ease')))}>
            <Card key={mod.id} className={style((fadeIn(2, 'ease')))} card={card} actions={[
              {
                execute: () => this.props.viewModule(mod.id),
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

export default ViewBrickComponent;
