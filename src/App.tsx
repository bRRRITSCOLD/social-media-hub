// node_modules
import React from 'react';
import {
  Redirect, Route, Switch, Link,
} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';

// styles
import { useAppStyles } from './App.styles';

// pages
import Home from './pages/Home';
import TwitterOAuthCallback from './pages/Twitter/TwitterOAuthCallback';

const App: React.FC = () => {
  const classes = useAppStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/about" color="inherit">
            About
          </Button>
        </Toolbar>
      </AppBar>
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
