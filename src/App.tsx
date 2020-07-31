/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// node_modules
import React, { Suspense, lazy } from 'react';
import {
  Redirect, Switch,
} from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import Container from '@material-ui/core/Container';

// styles

// pages
import { NavBar } from './components/Nav/NavBar';
import { useStoreState } from './lib/hooks';

const Home = lazy(() => import('./pages/Home'));
const TwitterOAuthCallback = lazy(() => import('./pages/Twitter/TwitterOAuthCallback'));

const requireLogin = (to: any, from: any, next: any) => {
  if (to.meta.jwt) {
    next();
  } else {
    next.redirect('/');
  }
};

const App: React.FC = () => {
  // user store specific
  const userState = useStoreState((store) => store.user);
  // render app
  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <Suspense fallback={<></>}>
          <GuardProvider guards={[requireLogin as any]}>
            <Switch>
              <GuardedRoute exact path="/" component={Home} />
              <GuardedRoute exact path="/about" meta={{ jwt: userState.session.jwt }}>
                <h1>About Page</h1>
              </GuardedRoute>
              <GuardedRoute exact path="/twitter/oauth/callback" component={TwitterOAuthCallback} />
              <Redirect to="/" />
            </Switch>
          </GuardProvider>
        </Suspense>
      </Container>
    </div>
  );
};

export default App;
