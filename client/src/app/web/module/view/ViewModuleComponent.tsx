import * as React from 'react';
import { Module, Session } from 'app/api/mapper/swagger/typescript-fetch-client';
import { WithThemeProps, UpBox, UpLoadingIndicator, UpNotification, UpButton } from '@up-group/react-controls';
import { RouteComponentProps } from 'react-router';
import { isEmpty } from 'common/utils';
import { IUser } from 'app/business/user/User';
import Page from 'app/components/container/Page';
import { style } from 'typestyle';
import { fadeIn, appearFromBottom } from 'common/animations';
import Event, { EventInfo } from 'app/components/display/Event';
import { IActionResult, IResultMessage, IntentType } from 'common/actions';

export interface IViewModuleComponentProps {
  authenticatedUser?: IUser;
  isFetching?: boolean;
  isFetchingSession?: boolean;
  module?: Module;
  id: string;
  sessions?: Array<Session>;
  navigateTo?: (route: string) => void;
  read?: (authToken: string, id: string) => void;
  getSessions?: (authToken: string, id: string) => void;
  viewSession?: (id: string) => void;
  addSession?: () => void;
  registerToSession?: (authToken: string, userId: string, sessionId: string) => Promise<IActionResult<Session>>;
  publishMessage?: (message: string, intent: IntentType) => void;
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

  registerToSession = (sessionId: string) => {
    return this.props.registerToSession(this.props.authenticatedUser.token, this.props.authenticatedUser.id, sessionId).then((result) => {
      this.props.publishMessage('Vous êtes inscrit à la session !', 'success');
    }).catch((errors: IResultMessage[]) => {

    });
  }

  render() {
    if (this.props.isFetching) {
      return <UpBox flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <UpLoadingIndicator displayMode={'layer'} message={'Chargement en cours...'} isLoading={true} />
      </UpBox>;
    }
    if (this.props.module) {
      return <Page title={this.props.module.name} titleStyle={{ color: 'white !important' }}>
        <UpNotification>
          {this.props.module.description}
        </UpNotification>
        {this.props.sessions && this.props.sessions.map((session: Session) => {
          const event: EventInfo = {
            ...session,
          };
          return <div key={session.id} className={style((appearFromBottom(1, 'ease')))}>
            <Event className={style((fadeIn(2, 'ease')))} event={event}>
              <UpBox flexDirection={'row'} className={style({ width: '100% !important', margin: '10px !important' })} alignItems={'center'} justifyContent={'center'}>
                <UpButton intent={'primary'} actionType={'timer'} onClick={() => this.registerToSession(session.id)}>
                  M'inscrire
                </UpButton>
              </UpBox>
            </Event></div>;
        })
        }
        {this.props.sessions != null && this.props.sessions.length === 0 &&
          <UpNotification intent={'warning'}>
            {'Aucune session programmée sur ce module !'}
          </UpNotification>
        }
        {this.props.authenticatedUser && this.props.authenticatedUser.is_admin &&
          <UpButton intent={'primary'} actionType={'add'} onClick={() => this.props.addSession()}>
            Ajouter une nouvelle session
          </UpButton>
        }
      </Page>;
    }

    return null;
  }
}

export default ViewModuleComponent;
