export const REQUEST_CARDS = 'REQUEST_CARDS';
export const requestCards = () => ({
  type: REQUEST_CARDS
});

export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const receiveCards = ({ cards, nextPageUrl }) => ({
  cards,
  nextPageUrl,
  type: RECEIVE_CARDS
});

export const HANDLE_FETCH_ERROR = 'HANDLE_FETCH_ERROR';
export const handleFetchError = error => ({
  error,
  type: HANDLE_FETCH_ERROR
});

export const SEARCH_CARDS = 'SEARCH_CARDS';
export const searchCards = term => ({
  term,
  type: SEARCH_CARDS
});

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const clearSearch = () => ({
  type: CLEAR_SEARCH
});

export const fetchCards = () =>
  async (dispatch, getState) => {
    const { nextPageUrl, loading } = getState();

    if (loading) {
      return;
    }

    dispatch(requestCards());
    return fetch(nextPageUrl)
      .then(res => res.json())
      .then(data => dispatch(receiveCards(data)))
      .catch(error => dispatch(handleFetchError(error)));
  };
