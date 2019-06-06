import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { history } from './components/Helpers';
import serviceWorker from './serviceWorker';

/*
TODO: show items in cart page.
TODO: display user information's on account page
TODO: set search bar functionality.
TODO: HOC for product management and requests.
*/

// Redux
import { Provider } from 'react-redux';
import store from './state/store';
// Component
import App from './App';
// UI
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

process.env.NODE_ENV === 'production' && serviceWorker();
