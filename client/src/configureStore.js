import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

export const defaultState = {
  cards: [],
  error: null,
  loading: false,
  nextPageUrl: `/api/cards?page=1`,
  searchTerm: ''
};

export function configureStore(preloadedState = defaultState) {
  const middlewareEnhancer = applyMiddleware(thunkMiddleware);
  return createStore(rootReducer, preloadedState, middlewareEnhancer);
}
