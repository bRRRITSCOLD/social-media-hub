// node_modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';

// css
import './index.css';

// components
import App from './App';

// store
import store from './store';

// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StoreProvider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </StoreProvider>,
  document.getElementById('root'),
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
