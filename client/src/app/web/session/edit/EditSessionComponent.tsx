import * as React from 'react';
import { Brick, Module, Session, NewSession } from 'app/api/mapper/swagger/typescript-fetch-client';
import { WithThemeProps, UpBox, UpLoadingIndicator, UpNotification, UpLabel, UpDate, UpButton, UpInput, UpSelect, UpText, UpTimePicker, UpGrid, UpCol, UpRow } from '@up-group/react-controls';
import { RouteComponentProps } from 'react-router';
import { isEmpty, isString } from 'common/utils';
import { IUser } from 'app/business/user/User';
import Page from 'app/components/container/Page';
import { style } from 'typestyle';
import { fadeIn, appearFromBottom } from 'common/animations';
import { Formik, Field } from 'formik';

import * as Yup from 'yup';
import * as moment from 'moment';

import { IResultMessage } from 'common/actions';
import { parse } from 'querystring';
import { ModeComment } from '@up-group/react-controls/dist/src/Components/Display/Icons/materialinear';

export interface IEditSessionComponentProps {
  authenticatedUser?: IUser;
  isFetching?: boolean;
  session?: Session;
  modules?: Array<Module>;
  sessionId: string;
  errors?: Array<IResultMessage>;
  navigateTo?: (route: string) => void;
  read?: (authToken: string, id: string) => void;
  add?: (authToken: string, args: NewSession) => Promise<Session>;
  update?: (authToken: string, args: Session) => Promise<Session>;
  getModules?: (authToken: string) => void;
}

type FormValues = Partial<Session> & { startDateTime?: string, endDateTime?: string };

class EditSessionComponent extends React.Component<IEditSessionComponentProps & WithThemeProps & RouteComponentProps<any, { id?: string }>> {

  static defaultProps: IEditSessionComponentProps = {
    sessionId: null,
  };

  componentDidMount() {
    if (!isEmpty(this.props.sessionId)) {
      // Lecture de la description de la session
      this.props.read(this.props.authenticatedUser.token, this.props.sessionId);
    }
    // Lecture des modules
    this.props.getModules(this.props.authenticatedUser.token);
  }

  edit = (values, { setSubmitting }) => {
    // Prepare the values passed to the creation
    let [hourStart, minuteStart] = values.startDateTime.split(':');
    if (parseInt(hourStart, 10) < 10) {
      hourStart = `0${hourStart}`;
    }
    if (parseInt(minuteStart, 10) < 10) {
      minuteStart = `0${minuteStart}`;
    }
    const startDate = moment(`${moment(values.startDate).format('YYYY-MM-DD')} ${hourStart}:${minuteStart}`);

    let [hourEnd, minuteEnd] = values.endDateTime.split(':');
    if (parseInt(hourEnd, 10) < 10) {
      hourEnd = `0${hourEnd}`;
    }
    if (parseInt(minuteEnd, 10) < 10) {
      minuteEnd = `0${minuteEnd}`;
    }
    const endDate = moment(`${moment(values.startDate).format('YYYY-MM-DD')} ${hourEnd}:${minuteEnd}`);

    const session: Session = {
      id: this.props.sessionId,
      name: values.name,
      description: values.description,
      moduleId: values.moduleId.id || values.moduleId,
      location: values.location,
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
    };

    // session.startDate = moment()
    if (this.props.sessionId) {
      // Update the session
      return this.props.update(this.props.authenticatedUser.token, session);
    }
    // Create a new session
    return this.props.add(this.props.authenticatedUser.token, session);
  };

  getValues = (): any => {
    let values: any = { startDate: null, endDate: null, location: '', description: '', name: '', moduleId: null };
    if (this.props.sessionId && this.props.session) {
      values = { ...this.props.session };
    }
    if (values.startDate && isString(values.startDate)) {
      values.startDate = moment(values.startDate).toDate();
    }

    if (values.endDate && isString(values.endDate)) {
      values.endDate = moment(values.endDate).toDate();
    }
    if (values.startDate) {
      values.startDateTime = `${values.startDate.getHours()}:${values.startDate.getMinutes()}`;
    }
    if (values.endDate) {
      values.endDateTime = `${values.endDate.getHours()}:${values.endDate.getMinutes()}`;
    }
    values.moduleId = values.moduleId ? {
      id: values.moduleId,
      text: this.props.modules ? this.props.modules.find(mod => mod.id === values.moduleId).name : 'Chargement...',
    } : null;
    return values;
  }

  render() {
    if (this.props.isFetching) {
      return <UpBox flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <UpLoadingIndicator displayMode={'layer'} message={'Chargement en cours...'} isLoading={true} />
      </UpBox>;
    }
    const title = this.props.sessionId == null ? `Ajout d'une nouvelle session` : `Edition ${this.props.session ? this.props.session.name : ''}`;
    const initialValues = this.getValues();
    return <Page title={title}>
      <div className={style({
        backgroundColor: 'white',
        borderRadius: '6px',
        padding: '10px',
      })}>
        <Formik
          initialValues={initialValues}
          onSubmit={this.edit}
          validationSchema={Yup.object().shape({
          })}>
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <UpGrid gutter={10}>
                  <UpRow>
                    <UpCol xs={24} sm={4} md={2} lg={2}>
                      <UpLabel text={'Le : '} inline={true} />
                    </UpCol>
                    <UpCol xs={24} sm={18} md={6} lg={6}>
                      <UpDate
                        name={'startDate'}
                        value={values.startDate}
                        onChange={handleChange} />
                    </UpCol>
                    <UpCol xs={24} sm={4} md={2}>
                      <UpLabel text={'de : '} inline={true} textAlign={'right'} />
                    </UpCol>
                    <UpCol xs={24} md={6}>
                      <UpTimePicker
                        hasError={false}
                        name={'startDateTime'}
                        value={values.startDateTime}
                        onChange={handleChange} />
                    </UpCol>
                    <UpCol xs={24} sm={4} md={2}>
                      <UpLabel text={'à : '} inline={true} textAlign={'right'} />
                    </UpCol>
                    <UpCol xs={24} md={6}>
                      <UpTimePicker
                        hasError={false}
                        name={'endDateTime'}
                        value={values.endDateTime}
                        onChange={handleChange} />
                    </UpCol>
                  </UpRow>
                  <UpLabel text={'Label : '} >
                    <UpInput
                      name={'name'}
                      value={values.name}
                      onChange={handleChange} />
                  </UpLabel>
                  <UpLabel text={'Lieu : '} >
                    <UpInput
                      name={'location'}
                      value={values.location}
                      onChange={handleChange} />
                  </UpLabel>
                  <UpLabel text={'Module : '} >
                    <UpSelect
                      name={'moduleId'}
                      value={values.moduleId}
                      data={this.props.modules ? this.props.modules.map((mod) => {
                        return {
                          id: mod.id,
                          text: mod.name,
                        };
                      }) : []}
                      onChange={handleChange} />
                  </UpLabel>
                  <UpLabel text={'Description : '} >
                    <UpText
                      name={'description'}
                      value={values.description}
                      onChange={handleChange} />
                  </UpLabel>
                  <UpBox flexDirection={'row'} alignItems={'flex-start'} justifyContent={'center'} style={{ margin: '20px 0px' }}>
                    <UpButton type={'submit'} disabled={isSubmitting} intent={'primary'} actionType={this.props.sessionId ? 'edit' : 'add'}>Enregistrer</UpButton>
                  </UpBox>
                  {this.props.errors &&
                    this.props.errors.map((error) => {
                      return (
                        <div style={{ margin: '10px 0px' }}>
                          <UpNotification {...error} dismissable={true} />
                        </div>
                      );
                    })
                  }
                </UpGrid>
              </form>
            );
          }}
        </Formik>
      </div>
    </Page >;
  }
}

export default EditSessionComponent;
