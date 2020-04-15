import * as actions from './';

jest.spyOn(global, 'fetch').mockImplementation(
  () => (async () => ({
    json: async () => ({
      cards: [{ id: 1 }, { id: 2 }],
      nextPageUrl: '/api/cards?page=2'
    })
  }))()
);

test('fetchCards does not fetch if loading is true', async () => {
  await actions.fetchCards()(jest.fn(), () => ({ loading: true }));
  expect(global.fetch).not.toHaveBeenCalled();
});

test('fetchCards dispatches a requestCards action', async () => {
  const dispatch = jest.fn();
  await actions.fetchCards()(dispatch, () => ({
    loading: false, nextPageUrl: '/api/cards?page=1'
  }));
  expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
    type: actions.REQUEST_CARDS
  }));
});

test('fetchCards calls fetch to the nextPageUrl', async () => {
  const dispatch = jest.fn();
  await actions.fetchCards()(dispatch, () => ({
    loading: false, nextPageUrl: '/api/cards?page=1'
  }));
  expect(global.fetch).toHaveBeenCalledWith('/api/cards?page=1');
});

test('fetchCards dispatches a receiveCards action after fetch resolves', async () => {
  const dispatch = jest.fn();
  await actions.fetchCards()(dispatch, () => ({
    loading: false, nextPageUrl: '/api/cards?page=1'
  }));
  expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
    type: actions.RECEIVE_CARDS,
    cards: expect.arrayContaining([{ id: 1 }, { id: 2 }]),
    nextPageUrl: '/api/cards?page=2'
  }));
});

test('fetchCards dispatches a handleFetchError action when fetch rejects', async () => {
  jest.spyOn(global, 'fetch').mockImplementationOnce(
    () => (async () => { throw new Error('test'); })()
  );
  const dispatch = jest.fn();
  await actions.fetchCards()(dispatch, () => ({
    loading: false, nextPageUrl: '/api/cards?page=1'
  }));
  expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
    type: actions.HANDLE_FETCH_ERROR,
    error: expect.objectContaining({ message: 'test' })
  }));
});
