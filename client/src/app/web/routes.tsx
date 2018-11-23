import * as React from 'react';
import { Route, IndexRedirect } from 'react-router';

import Background from './Background';
import Error404 from 'app/web/Error404';
import HomeContainer from 'app/web/home/HomeContainer';
import LoginContainer from './login/LoginContainer';
import { restrict } from './RestrictedContainer';
import FrameContainer from './FrameContainer';

export const routes = (
  <Route path="/" component={Background}>
    <IndexRedirect to="/login" />
    <Route path="/login" component={LoginContainer} props={{ title: '(R)evoltion Digitale' }} />
    <Route component={restrict(FrameContainer)}>
      <Route path="/bricks" component={HomeContainer} />
    </Route>
    <Route path="*" component={Error404} />
  </Route>
);
