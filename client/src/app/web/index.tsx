import * as React from 'react';
import { render } from 'react-dom';
import { scrollToElement } from 'common/utils';
import { syncHistoryWithStore } from 'react-router-redux';
import { store } from '../store';
import { browserHistory } from 'react-router';
import theme from './../theme';
import { App } from './app';

// Import a pre-configured instance of i18next
import './i18n';

require('typeface-poppins');

import { normalize, setupPage } from 'csstips';

normalize();
setupPage('#app');

const onRouteUpdate = () => {
  scrollToElement('topAnchor');
};

const history = syncHistoryWithStore(browserHistory, store);

render(
  <App store={store} history={history} onRouteUpdate={onRouteUpdate} theme={theme} />,
  document.getElementById('app'),
);
