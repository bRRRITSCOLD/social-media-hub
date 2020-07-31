/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// node_modules
import React, { Suspense, lazy } from 'react';
import {
  Redirect, Switch, Route,
} from 'react-router-dom';
import Container from '@material-ui/core/Container';

// libraries
import { useStoreState } from './lib/hooks';
import * as guards from './lib/guards';

// styles

// components
import { NavBar } from './components/Nav/NavBar';

// pages
const About = lazy(() => import('./pages/About'));
const Home = lazy(() => import('./pages/Home'));
const TwitterOAuthCallback = lazy(() => import('./pages/Twitter/TwitterOAuthCallback'));

const App: React.FC = () => {
  // user store specific
  const userState = useStoreState((store) => store.user);
  // render app
  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <Suspense fallback={<></>}>
          <Switch>
            <Route exact path="/" component={Home} />
            {
              !userState.isLoggedIn || guards.roles(userState.decodedJwt?.roles, guards.ABOUT_PAGE_ROLES)
                ? ''
                : (
                  <Route
                    exact
                    path="/about"
                    component={About}
                  />
                )
            }
            {
              !userState.isLoggedIn || guards.roles(userState.decodedJwt?.roles, guards.TWITTER_PAGE_ROLES)
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
