import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-router';
import Background from './Background';

require('../../../assets/favicon.ico');

import 'typeface-roboto';
// import * as injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();

import { InstanceState } from 'app/reducers';
import { IResultMessage } from 'common/actions';
import { routes } from './routes';
import ErrorPage from './ErrorPage';
import { UpLoadingIndicator, UpThemeProvider, UpDefaultTheme } from '@up-group/react-controls';

interface ApplicationProps {
  store: any;
  history: any;
  onRouteUpdate: any;
  theme: any;
  isFetching?: boolean;
}

interface ApplicationState {
  errors?: IResultMessage[];
  isFetching: boolean;
}

class Application extends React.Component<ApplicationProps, ApplicationState>{

  static defaultProps = {
    isFetching: true,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isFetching: props.isFetching,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isFetching: false });
    }, 2000);
  }

  render() {
    if (this.state.errors) {
      return <ErrorPage errors={this.state.errors} />;
    }

    if (this.state.isFetching) {
      return (
        <UpThemeProvider theme={UpDefaultTheme}>
          <Background>
            <UpLoadingIndicator message={'Chargement en cours...'} isLoading={true} />
          </Background></UpThemeProvider>
      );
    }

    return (
      <UpThemeProvider theme={UpDefaultTheme}>
        <Provider store={this.props.store}>
          <Router history={this.props.history} onUpdate={this.props.onRouteUpdate}>
            {
              routes
            }
          </Router>
        </Provider>
      </UpThemeProvider>);
  }
}

const mapStateToProps = function (state: InstanceState, props) {
  // TODO only the first campaign is considered
  return {
  };
};

const mapDispatchToProps = function (dispatch, props) {
  return {
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(Application as any);
