import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as addRecommendation from './addRecommendation/reducer';
import * as global from './global/reducer';

let store;

const getMiddleware = () => {
  const middleware = [];

  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    middleware.push(logger);
  }

  middleware.push(thunk);

  return middleware;
};

export const createRootReducer = () => {
  return combineReducers({
    addRecommendationState: addRecommendation.reducer,
    globalState: global.reducer,
  });
};

function configureStore(initialState) {
  const rootReducer = createRootReducer();

  let appliedMiddleware = applyMiddleware(...getMiddleware());

  if (process.env.NODE_ENV === `development`) {
    appliedMiddleware = composeWithDevTools(appliedMiddleware);
  }

  store = createStore(rootReducer, initialState, appliedMiddleware);
  return store;
}

export const getStore = () => {
  return store;
};

export const makeRootStore = initialState => configureStore(initialState);
