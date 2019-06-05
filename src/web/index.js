import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { history } from './components/Helpers';
import serviceWorker from './serviceWorker';

/*
TODO: set login form backend compatibility.
TODO: set interact with localStorage to keep session ID.
TODO: redux thunk on app initializing.
TODO: create cart page with withAuthentication.
*/

// Redux
import { Provider } from 'react-redux';
import store from './state/store';
// fetch('/api/open/product', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.log(err))
// Component
import App from './App';
// UI
import './index.css';
import { getAuthUser } from './state/actions/session';

// Token ID
const sessionObject = {};
// Fetch authUser data
// sessionObject && store.dispatch(getAuthUser(sessionObject))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

process.env.NODE_ENV === 'production' && serviceWorker();
