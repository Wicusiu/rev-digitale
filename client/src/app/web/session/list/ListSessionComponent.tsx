import * as React from 'react';
import { Session, NewSession } from 'app/api/mapper/swagger/typescript-fetch-client';
import { WithThemeProps, UpBox, UpLoadingIndicator, UpNotification, UpLink, UpButton, UpParagraph } from '@up-group/react-controls';
import { RouteComponentProps } from 'react-router';
import { IUser } from 'app/business/user/User';
import Page from 'app/components/container/Page';
import { style } from 'typestyle';

import { IResultMessage } from 'common/actions';
import Event from 'app/components/display/Event';

export interface IListSessionComponentProps {
  authenticatedUser?: IUser;
  isFetching?: boolean;
  session?: Session;
  sessions?: Array<Session>;
  errors?: Array<IResultMessage>;
  navigateTo?: (route: string) => void;
  read?: (authToken: string, id: string) => void;
  add?: (authToken: string, args: NewSession) => Promise<Session>;
  update?: (authToken: string, args: Session) => Promise<Session>;
  getByUser?: (authToken: string, userid: string) => Promise<Array<Session>>;
}

class ListSessionComponent extends React.Component<IListSessionComponentProps & WithThemeProps & RouteComponentProps<any, {}>> {

  static defaultProps: IListSessionComponentProps = {
  };

  componentDidMount() {
    // @TODO : Pass by GraphQL
    this.props.getByUser(this.props.authenticatedUser.token, this.props.authenticatedUser.id);
  }

  render() {
    if (this.props.isFetching) {
      return <UpBox flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <UpLoadingIndicator displayMode={'layer'} message={'Chargement en cours...'} isLoading={true} />
      </UpBox>;
    }
    const title = 'Mes sessions';

    return <Page title={title}>
      <div className={style({
        backgroundColor: 'white',
        borderRadius: '6px',
        padding: '10px',
      })}>
        {this.props.sessions != null && this.props.sessions.length === 0 &&
          <UpNotification intent={'warning'}>
            <UpParagraph>{`Vous n'êtes inscrit à aucune session !`}</UpParagraph>
            <UpButton intent={'primary'} onClick={() => this.props.navigateTo('/modules')}>Voir les modules</UpButton>
          </UpNotification>
        }
        {this.props.sessions != null && this.props.sessions.length > 0 &&
          this.props.sessions.map((session) => {
            return <Event event={session} />;
          })
        }
      </div>
    </Page >;
  }
}

export default ListSessionComponent;
