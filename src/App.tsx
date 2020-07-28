// node_modules
import React from 'react';
import {
  Redirect, Route, Switch,
} from 'react-router-dom';
import Container from '@material-ui/core/Container';

// styles
import { useAppStyles } from './App.styles';

// pages
import Home from './pages/Home';
import TwitterOAuthCallback from './pages/Twitter/TwitterOAuthCallback';
import { NavBar } from './components/Nav/NavBar';

const App: React.FC = () => {
  const classes = useAppStyles();

  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about">
            <h1>About Page</h1>
          </Route>
          <Route exact path="/twitter/oauth/callback" component={TwitterOAuthCallback} />
          <Redirect to="/" />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
