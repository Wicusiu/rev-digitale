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
import { ModuleService } from 'app/api/ModuleService';
import { getByBrick } from 'app/business/module/events/getByBrick';

const mapDispatchToProps = function (dispatch: Dispatch<any>) {
  return {
    read: (authToken: string, id: string) => {
      const brickService = ServiceFactory.create(BrickService, dispatch, authToken);
      return dispatch(read(brickService, id));
    },
    getModules: (authToken: string, brickId: string) => {
      const moduleService = ServiceFactory.create(ModuleService, dispatch, authToken);
      return dispatch(getByBrick(moduleService, brickId));
    },
    viewModule: (id: string) => dispatch(push(`/modules/${id}`)),
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
    isFetchingModules: state.application.module.isFetching,
    modules: state.application.module.values,
    errorsModules: state.application.module.errors,
  } as Partial<IViewBrickComponentProps>;
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBrickComponent);
