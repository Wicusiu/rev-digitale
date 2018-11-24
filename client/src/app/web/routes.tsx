import * as React from 'react';
import { Route, IndexRedirect } from 'react-router';

import Background from './Background';
import Error404 from 'app/web/Error404';
import LoginContainer from './login/LoginContainer';
import { restrict } from './RestrictedContainer';
import FrameContainer from './FrameContainer';
import BricksContainer from './brick/list/ListBrickContainer';
import ViewBrickContainer from './brick/view/ViewBrickContainer';

export const routes = (
  <Route path="/" component={Background}>
    <IndexRedirect to="/login" />
    <Route path="/login" component={LoginContainer} props={{ title: '(R)evoltion Digitale' }} />
    <Route component={restrict(FrameContainer)}>
      <Route path="/bricks" component={BricksContainer} />
      <Route path="/bricks/:id" component={ViewBrickContainer} />
      <Route path="/bricks/view/:id" component={ViewBrickContainer} />
    </Route>
    <Route path="*" component={Error404} />
  </Route>
);
