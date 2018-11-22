import * as React from 'react';
import { I18n } from 'react-redux-i18n';
import ErrorPage from 'app/web/ErrorPage';
import { style } from 'typestyle';
import { withRouter, WithRouterProps } from 'react-router';
import { UpNotification, UpLink, UpGrid, UpRow, UpBox } from '@up-group/react-controls';

interface IErrorBoundaryFallbackComponentProps extends WithRouterProps {
  componentStack: string,
  error: Error,
}

export const DefaultErrorBoundaryFallbackComponent = ({ componentStack, error, router, location }: IErrorBoundaryFallbackComponentProps) => {
  return (
    <ErrorPage>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <defs>
          <linearGradient y2="161.29" x2="0" y1="218.22" gradientUnits="userSpaceOnUse" id="0">
            <stop stop-color="#c52828" /><stop offset="1" stop-color="#ff5454" />
          </linearGradient>
        </defs>
        <g transform="matrix(.92857 0 0 .92857-666.94-144.37)">
          <circle r="28" cy="189.93" cx="752.7" fill="url(#0)" />
          <g fill="#fff" fill-opacity=".851">
            <path d="m739.54 180.23c0-2.166 1.756-3.922 3.922-3.922 2.165 0 3.922 1.756 3.922 3.922 0 2.167-1.756 3.923-3.922 3.923-2.166 0-3.922-1.756-3.922-3.923m17.784 0c0-2.166 1.758-3.922 3.923-3.922 2.165 0 3.922 1.756 3.922 3.922 0 2.167-1.756 3.923-3.922 3.923-2.166 0-3.923-1.756-3.923-3.923" /><path d="m766.89 200.51c-2.431-5.621-8.123-9.253-14.502-9.253-6.516 0-12.242 3.65-14.588 9.3-.402.967.056 2.078 1.025 2.48.238.097.485.144.727.144.744 0 1.45-.44 1.753-1.17 1.756-4.229 6.107-6.96 11.08-6.96 4.864 0 9.189 2.733 11.02 6.965.416.962 1.533 1.405 2.495.989.961-.417 1.405-1.533.989-2.495" />
          </g>
        </g>
      </svg>
      <UpNotification intent={'info'}>
        <p>{I18n.t('web.unexpectedErrorMessage')}</p>
        <p>
          <UpLink onClick={() => router.replace({
            pathname: '/login',
            search: location.search,
            state: location.state,
            query: { redirectTo: location.pathname },
          })}>{I18n.t('web.goBackMessage')}</UpLink>
        </p>
      </UpNotification>
      <UpNotification intent={'error'}>
        {error.message}
      </UpNotification>
      <UpBox>
        <div className={style({ margin: '16px 0px' })}
          title={I18n.t('web.moreInfoTitle')}
        >
          <UpNotification intent={'error'}>
            {componentStack}
          </UpNotification>
        </div>
      </UpBox>
    </ErrorPage>);
};

export interface IErrorBoundaryProps {
  children?: any,
  FallbackComponent: React.ComponentType<any>,
  onError?: (error: Error, componentStack: string) => void,
}

export interface ErrorInfo {
  componentStack: string
}

export interface IErrorBoundaryState {
  error?: Error,
  info?: ErrorInfo,
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  static defaultProps = {
    FallbackComponent: DefaultErrorBoundaryFallbackComponent,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      error: null,
      info: null,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const { onError } = this.props;

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info ? info.componentStack : '');
      } catch (ignoredError) { }
    }

    this.setState({ error, info });
  }

  render() {
    const { children, FallbackComponent } = this.props;
    const { error, info } = this.state;

    if (error !== null) {
      return (
        <FallbackComponent
          componentStack={info ? info.componentStack : ''}
          error={error}
        />
      );
    }

    return children;
  }
}

export const withErrorBoundary = (
  Component: React.ComponentType<any>,
  FallbackComponent?: React.ComponentType<any>,
  onError?: (error: Error, componentStack: string) => void,
) => props => (
  <ErrorBoundary FallbackComponent={withRouter(FallbackComponent)} onError={onError}>
    <Component {...props} />
  </ErrorBoundary>
);

export default ErrorBoundary;
