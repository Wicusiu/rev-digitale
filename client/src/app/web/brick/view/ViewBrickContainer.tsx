import { Dispatch } from 'react';
import { BrickService } from 'app/api/BrickService';
import ViewBrickComponent, { IViewBrickComponentProps } from './ViewBrickComponent';
import { ServiceFactory } from 'app/web/ServiceFactory';
import { read } from 'app/business/brick/BrickEvents';
import { InstanceState } from 'app/reducers';
import { RouteComponentProps } from 'react-router';
import { WithThemeProps } from '@up-group/react-controls';
import { connect } from 'react-redux';
import { isEmpty } from 'common/utils';
import { push } from 'react-router-redux';

const mapDispatchToProps = function (dispatch: Dispatch<any>) {
  return {
    read: (authToken: string, id: string) => {
      const brickService = ServiceFactory.create(BrickService, dispatch, authToken);
      return dispatch(read(brickService, id));
    },
    navigateTo: (route: string) => dispatch(push(route)),
  } as Partial<IViewBrickComponentProps>;
};

const mapStateToProps = function (state: InstanceState, ownProps: IViewBrickComponentProps & WithThemeProps & RouteComponentProps<any, { id?: string }>) {
  const passedProps = ownProps.route && ownProps.route.props ? ownProps.route.props : {};

  return {
    ...passedProps,
    brickId: ownProps.params.id,
    authToken: state.application.user.authenticatedUser ? state.application.user.authenticatedUser.token : null,
    authenticatedUser: state.application.user.authenticatedUser,
    errors: state.application.brick.errors,
    brick: state.application.brick.currentValue,
    isFetching: state.application.brick.isFetching,
  } as Partial<IViewBrickComponentProps>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBrickComponent);
