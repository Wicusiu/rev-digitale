import * as React from 'react';
import { AttendeeParticipationStatus } from 'app/api/mapper/swagger/typescript-fetch-client';
import { WithThemeProps, UpBox, UpLoadingIndicator, UpNotification, UpLink, UpButton, UpParagraph } from '@up-group/react-controls';
import { RouteComponentProps } from 'react-router';
import { IUser } from 'app/business/user/User';
import Page from 'app/components/container/Page';
import { style } from 'typestyle';

import { IResultMessage } from 'common/actions';
import { IPathway } from 'app/business/pathway/IPathway';
import Card, { CardInfo } from 'app/components/display/Card';
import { appearFromBottom, fadeIn } from 'common/animations';

export interface IViewPathwayComponentProps {
  authenticatedUser?: IUser;
  isFetching?: boolean;
  pathway?: IPathway;
  errors?: Array<IResultMessage>;
  navigateTo?: (route: string) => void;
  read?: (authToken: string, id: string) => void;
}

class ViewPathwayComponent extends React.Component<IViewPathwayComponentProps & WithThemeProps & RouteComponentProps<any, {}>> {

  static defaultProps: IViewPathwayComponentProps = {
  };

  componentDidMount() {
    // @TODO : Pass by GraphQL
    this.props.read(this.props.authenticatedUser.token, this.props.authenticatedUser.id);
  }

  viewModuleSessions = (id: string) => {
    return this.props.navigateTo(`/modules/${id}`);
  }

  render() {
    if (this.props.isFetching) {
      return <UpBox flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <UpLoadingIndicator displayMode={'layer'} message={'Chargement en cours...'} isLoading={true} />
      </UpBox>;
    }
    const title = 'Mon Parcours Personnalisé';

    return <Page title={title}>
      <div className={style({
        backgroundColor: 'white',
        borderRadius: '6px',
        padding: '10px',
      })}>
        {this.props.pathway != null && this.props.pathway.modules != null && this.props.pathway.modules.length === 0 &&
          <UpNotification intent={'warning'}>
            <UpParagraph>{`Vous n'êtes inscrit à aucun module !`}</UpParagraph>
            <UpButton intent={'primary'} onClick={() => this.props.navigateTo('/modules')}>Voir les modules</UpButton>
          </UpNotification>
        }
        {this.props.pathway != null && this.props.pathway.modules != null && this.props.pathway.modules.length > 0 &&
          this.props.pathway.modules.map((mod) => {
            const card: CardInfo = {
              description: mod.description,
              name: mod.name,
              photo: mod.brick.logo,
            };
            const sessionAttendee = mod.sessionAttendee ? mod.sessionAttendee.attendees.find(a => a.userId === this.props.pathway.userId) : null;
            return <div key={mod.id} className={style((appearFromBottom(1, 'ease')))}>
              <Card className={style((fadeIn(2, 'ease')))} card={card}>
                <UpBox flexDirection={'row'} className={style({ width: '100% !important', margin: '10px !important' })} alignItems={'center'} justifyContent={'center'}>
                  {sessionAttendee && sessionAttendee.status === AttendeeParticipationStatus.Participated &&
                    <UpButton intent={'primary'} actionType={'comment'}>
                      Votre avis
                    </UpButton>
                  }
                  {sessionAttendee && sessionAttendee.status === AttendeeParticipationStatus.Planned &&
                    <UpButton intent={'primary'} actionType={'edit'} onClick={() => this.viewModuleSessions(mod.id)}>
                      Modifier ma session
                    </UpButton>
                  }
                  {!sessionAttendee &&
                    <UpButton intent={'primary'} actionType={'timer'} onClick={() => this.viewModuleSessions(mod.id)}>
                      Plannifier ma session
                    </UpButton>
                  }
                </UpBox>
              </Card>
            </div>;
          })
        }
      </div>
    </Page >;
  }
}

export default ViewPathwayComponent;
