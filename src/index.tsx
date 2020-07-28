// node_modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

// css
import './index.css';

// components
import App from './App';

// store
import store from './store';

// theme
import theme from './theme';

// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StoreProvider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </MuiThemeProvider>
    </Router>
  </StoreProvider>,
  document.getElementById('root'),
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
