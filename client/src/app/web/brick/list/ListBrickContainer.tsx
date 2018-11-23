import { Dispatch } from 'react';
import { BrickService } from 'app/api/BrickService';
import { apiMiddleware } from 'app/api/ApiMiddlewares';
import { BASE_URL } from 'app/config';
import ListBrickComponent, { IBricksComponentProps } from './ListBrickComponent';
import { list } from 'app/business/brick/BrickEvents';
import { ServiceFactory } from 'app/web/ServiceFactory';
import { InstanceState } from 'app/reducers';
import { WithThemeProps } from '@up-group/react-controls';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

const mapDispatchToProps = function (dispatch: Dispatch<any>) {
  return {
    getBricks: (authToken: string) => {
      const brickService = ServiceFactory.create(BrickService, dispatch, authToken);
      return dispatch(list(brickService));
    },
  } as Partial<IBricksComponentProps>;
};

const mapStateToProps = function (state: InstanceState, ownProps: IBricksComponentProps & WithThemeProps & RouteComponentProps<any, {}>) {

  const passedProps = ownProps.route && ownProps.route.props ? ownProps.route.props : {};

  return {
    ...passedProps,
    authToken: state.application.user.authenticatedUser ? state.application.user.authenticatedUser.token : null,
    authenticatedUser: state.application.user.authenticatedUser,
    errors: state.application.brick.errors,
    bricks: state.application.brick.values,
    isFetching: state.application.brick.isFetching,
  } as Partial<IBricksComponentProps>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ListBrickComponent);
