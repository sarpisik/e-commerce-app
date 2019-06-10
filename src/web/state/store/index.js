import { createStore, applyMiddleware, compose } from 'redux';
// import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const logger = createLogger()

const store = createStore(
  rootReducer,
  undefined,
  storeEnhancers(
    applyMiddleware(
      // logger,
      thunk
    )
  )
);

export default store;
