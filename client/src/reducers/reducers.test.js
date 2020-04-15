import reducer from './';
import * as actions from '../actions';
import { defaultState } from '../configureStore';

test('request cards action sets loading to true', () => {
  const newState = reducer(defaultState, actions.requestCards());
  expect(newState.loading).toBe(true);
});

test('receive cards action sets loading to false', () => {
  const oldState = { ...defaultState };
  oldState.loading = true;
  const action = actions.receiveCards({ cards: [], nextPageUrl: '/api/cards?page=2' });
  const newState = reducer(defaultState, action);
  expect(newState.loading).toBe(false);
});

test('receive cards action appends cards to existing list', () => {
  const oldState = { ...defaultState };
  oldState.cards = [{}, {}];
  const action = actions.receiveCards({ cards: [{}, {}], nextPageUrl: '/api/cards?page=2' });
  const newState = reducer(oldState, action);
  expect(newState.cards.length).toBe(4);
});

test('receive cards action sets nextPageUrl', () => {
  const oldState = { ...defaultState };
  oldState.nextPageUrl = '/api/cards?page=2';
  const action = actions.receiveCards({ cards: [{}], nextPageUrl: '/api/cards?page=3' });
  const newState = reducer(oldState, action);
  expect(newState.nextPageUrl).toBe('/api/cards?page=3');
});

test('handle fetch error action sets loading to false', () => {
  const oldState = { ...defaultState };
  oldState.loading = true;
  const newState = reducer(oldState, actions.handleFetchError(new Error()));
  expect(newState.loading).toBe(false);
});

test('handle fetch error action sets error', () => {
  const oldState = { ...defaultState };
  const newState = reducer(oldState, actions.handleFetchError(new Error('test')));
  expect(newState.error.message).toBe('test');
});
