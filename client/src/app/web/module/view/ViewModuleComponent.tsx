import * as React from 'react';
import { Module, Session } from 'app/api/mapper/swagger/typescript-fetch-client';
import { WithThemeProps, UpBox, UpLoadingIndicator, UpNotification } from '@up-group/react-controls';
import { RouteComponentProps } from 'react-router';
import { isEmpty } from 'common/utils';
import { IUser } from 'app/business/user/User';
import Page from 'app/components/container/Page';
import Card, { CardInfo } from 'app/components/display/Card';
import { style } from 'typestyle';
import { fadeIn, appearFromBottom } from 'common/animations';

export interface IViewModuleComponentProps {
  authenticatedUser?: IUser;
  isFetching?: boolean;
  module?: Module;
  id: string;
  sessions?: Array<Session>;
  navigateTo?: (route: string) => void;
  read?: (authToken: string, id: string) => void;
  getSessions?: (authToken: string, id: string) => void;
  viewSession?: (id: string) => void;
}

class ViewModuleComponent extends React.Component<IViewModuleComponentProps & WithThemeProps & RouteComponentProps<any, { id?: string }>> {

  static defaultProps: IViewModuleComponentProps = {
    id: null,
  };

  componentDidMount() {
    // Récupération de la module
    if (isEmpty(this.props.id)) {
      this.props.navigateTo('/404');
    } else {
      // Lecture de la description de la brique
      this.props.read(this.props.authenticatedUser.token, this.props.id);
      // Lecture des modules de la brique
      this.props.getSessions(this.props.authenticatedUser.token, this.props.id);
    }
  }

  render() {
    if (this.props.isFetching) {
      return <UpBox flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <UpLoadingIndicator isLoading={true} />
      </UpBox>;
    }
    if (this.props.module) {
      return <Page title={this.props.module.name}>
        <UpNotification>
          {this.props.module.description}
        </UpNotification>
        {this.props.sessions && this.props.sessions.map((session: Session) => {
          const card: CardInfo = {
            description: session.description,
            name: session.name,
          };
          return <div className={style((appearFromBottom(1, 'ease')))}>
            <Card key={session.id} className={style((fadeIn(2, 'ease')))} card={card} actions={[
              {
                execute: () => this.props.viewSession(session.id),
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

export default ViewModuleComponent;
