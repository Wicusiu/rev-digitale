import { Dispatch } from 'react';
import { ServiceFactory } from 'app/web/ServiceFactory';
import { InstanceState } from 'app/reducers';
import { RouteComponentProps } from 'react-router';
import { WithThemeProps } from '@up-group/react-controls';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { read } from 'app/business/pathway/PathwayEvents';
import { PathwayService } from 'app/api/PathwayService';
import ViewPathwayComponent, { IViewPathwayComponentProps } from './ViewPathwayComponent';

const mapDispatchToProps = function (dispatch: Dispatch<any>) {
  return {
    read: (authToken: string, userId: string) => {
      const pathwayService = ServiceFactory.create(PathwayService, dispatch, authToken);
      return dispatch(read(pathwayService, userId));
    },
    navigateTo: (route: string) => dispatch(push(route)),
  } as Partial<IViewPathwayComponentProps>;
};

const mapStateToProps = function (state: InstanceState, ownProps: IViewPathwayComponentProps & WithThemeProps & RouteComponentProps<any, { id?: string }>) {
  const passedProps = ownProps.route && ownProps.route.props ? ownProps.route.props : {};

  return {
    // Props passed to the container
    ...passedProps,
    // User State
    authToken: state.application.user.authenticatedUser ? state.application.user.authenticatedUser.token : null,
    authenticatedUser: state.application.user.authenticatedUser,
    // Pathway state
    errors: state.application.pathway.errors,
    pathway: state.application.pathway.currentValue,
    isFetching: state.application.pathway.isFetching,
  } as Partial<IViewPathwayComponentProps>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPathwayComponent);
