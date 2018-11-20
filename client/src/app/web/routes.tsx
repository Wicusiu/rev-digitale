import * as React from 'react';
import { Route, IndexRedirect } from 'react-router';

import Background from './Background';
import Error404 from 'app/web/Error404';
import HomeContainer from 'app/web/home/HomeContainer';

export const routes = (
  <Route path="/" component={Background}>
    <IndexRedirect to="/home" />
    <Route path="/home" component={HomeContainer} props={{ public: true }} />
    <Route path="*" component={Error404} />
  </Route>
);
