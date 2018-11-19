import * as React from 'react';
import { render } from 'react-dom';
import { scrollToElement } from 'common/utils';
import { syncHistoryWithStore } from 'react-router-redux';
import { store } from '../store';
import { syncTranslationWithStore, loadTranslations, setLocale } from 'react-redux-i18n';
import { browserHistory } from 'react-router';
import { frRessources } from './ressources.fr';
import theme from './../theme';
import { App } from './app';

require('typeface-poppins');

import { normalize, setupPage } from 'csstips';

normalize();
setupPage('#app');

const onRouteUpdate = () => {
  scrollToElement('topAnchor');
};

const history = syncHistoryWithStore(browserHistory, store);
syncTranslationWithStore(store);
store.dispatch(loadTranslations({ fr: frRessources }));
store.dispatch(setLocale('fr'));

render(
    <App store={store} history={history} onRouteUpdate={onRouteUpdate} theme={theme} />,
    document.getElementById('app'),
);
