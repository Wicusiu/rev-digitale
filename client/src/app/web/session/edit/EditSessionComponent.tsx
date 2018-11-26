import * as React from 'react';
import { Brick, Module, Session } from 'app/api/mapper/swagger/typescript-fetch-client';
import { WithThemeProps, UpBox, UpLoadingIndicator, UpNotification, UpLabel, UpDate, UpButton, UpInput, UpSelect } from '@up-group/react-controls';
import { RouteComponentProps } from 'react-router';
import { isEmpty } from 'common/utils';
import { IUser } from 'app/business/user/User';
import Page from 'app/components/container/Page';
import { style } from 'typestyle';
import { fadeIn, appearFromBottom } from 'common/animations';
import { Formik, Field } from 'formik';

import * as Yup from 'yup';
import { IResultMessage } from 'common/actions';

export interface IEditSessionComponentProps {
  authenticatedUser?: IUser;
  isFetching?: boolean;
  session?: Session;
  modules?: Array<Module>;
  sessionId: string;
  errors?: Array<IResultMessage>;
  navigateTo?: (route: string) => void;
  read?: (authToken: string, id: string) => void;
  getModules?: (authToken: string) => void;
}

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

  edit: (values) => {

  };

  render() {
    if (this.props.isFetching) {
      return <UpBox flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <UpLoadingIndicator isLoading={true} />
      </UpBox>;
    }
    const title = this.props.sessionId ? `Ajout d'une nouvelle session` : `Edition ${this.props.session ? this.props.session.name : ''}`;
    const initialValues = this.props.session ? this.props.session : { startDate: null, endDate: null, description: '', name: '', moduleId: null };
    if (this.props.sessionId) {
      return <Page title={title}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            return this.edit(values);
          }}
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
                <Field
                  name={'startDate'}
                  render={({ field, form }) => {
                    <UpLabel text={'Du : '} >
                      <UpDate
                        value={values.startDate}
                        onChange={handleChange} />
                    </UpLabel>;
                  }} />
                <Field
                  name={'endDate'}
                  render={({ field, form }) => {
                    <UpLabel text={'Au : '} >
                      <UpDate
                        value={values.endDate}
                        onChange={handleChange} />
                    </UpLabel>;
                  }} />
                <Field
                  name={'name'}
                  render={({ field, form }) => {
                    <UpLabel text={'Label : '} >
                      <UpInput
                        value={values.name}
                        onChange={handleChange} />
                    </UpLabel>;
                  }} />
                <Field
                  name={'location'}
                  render={({ field, form }) => {
                    <UpLabel text={'Lieu : '} >
                      <UpInput
                        value={values.name}
                        onChange={handleChange} />
                    </UpLabel>;
                  }} />
                <Field
                  name={'moduleId'}
                  render={({ field, form }) => {
                    <UpLabel text={'Module : '} >
                      <UpSelect
                        value={values.moduleId}
                        data={this.props.modules ? this.props.modules.map((mod) => {
                          return {
                            id: mod.id,
                            text: mod.name,
                          };
                        }) : []}
                        onChange={handleChange} />
                    </UpLabel>;
                  }} />
                <Field
                  name={'description'}
                  render={({ field, form }) => {
                    <UpLabel text={'Description : '} >
                      <UpInput
                        value={values.name}
                        onChange={handleChange} />
                    </UpLabel>;
                  }} />
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
              </form>
            );
          }}
        </Formik>
      </Page>;
    }

    return null;
  }
}

export default EditSessionComponent;
