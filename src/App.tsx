/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// node_modules
import React, { Suspense, lazy, useEffect } from 'react';
import {
  Redirect, Switch, Route,
} from 'react-router-dom';
import Container from '@material-ui/core/Container';

// libraries
import { useStoreActions, useStoreState } from './lib/hooks';
import * as guards from './lib/guards';

// styles

// components
import { NavBar } from './components/Nav/NavBar';

// pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Home = lazy(() => import('./pages/Home'));
const TwitterOAuthCallback = lazy(() => import('./pages/Twitter/TwitterOAuthCallback'));

const App: React.FC = () => {
  // user store specific
  const userState = useStoreState((store) => store.user);
  const userActions = useStoreActions((store) => store.user);
  // call use effect only twice (app load
  // (mount) and app unload (unmount))
  useEffect(
    // page load (mount)
    () => {
    // start polling if we are
    // logged in/have jwt
      if (userState.isLoggedIn && !userState.isPollingRefreshUserJWT) userActions.startPollingRefreshUserJWT({
        jwt: userState.session.jwt,
        jwtRefreshToken: userState.session.jwtRefreshToken,
      });
      // page unload (unmount)
      return () => {
        userActions.stopPollingRefreshUserJWT();
      };
    },
    [],
  );
  // render app
  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <Suspense fallback={<></>}>
          <Switch>
            <Route exact path="/" component={Home} />
            {
              !userState.isLoggedIn || guards.roles(userState.decodedJWT?.roles, guards.ABOUT_PAGE_ROLES)
                ? ''
                : (
                  <Route
                    exact
                    path="/dashboard"
                    component={Dashboard}
                  />
                )
            }
            {
              !userState.isLoggedIn || guards.roles(userState.decodedJWT?.roles, guards.TWITTER_PAGE_ROLES)
                ? ''
                : (
                  <Route
                    exact
                    path="/twitter/oauth/callback"
                    component={TwitterOAuthCallback}
                  />
                )
            }
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
};

export default App;
