import { REQUEST_CARDS, RECEIVE_CARDS, HANDLE_FETCH_ERROR, SEARCH_CARDS, CLEAR_SEARCH } from '../actions';
import { defaultState } from '../configureStore';

export default function app(state, action) {
  switch (action.type) {
    case REQUEST_CARDS:
      return { ...state, loading: true };
    case RECEIVE_CARDS:
      const { cards, nextPageUrl } = action;
      return {
        ...state,
        nextPageUrl,
        cards: [...state.cards, ...cards],
        loading: false
      };
    case SEARCH_CARDS:
      return { ...state, cards: [], nextPageUrl: `${defaultState.nextPageUrl}&name=${action.term}` };
    case CLEAR_SEARCH:
      return { ...state, cards: [], nextPageUrl: defaultState.nextPageUrl };
    case HANDLE_FETCH_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
