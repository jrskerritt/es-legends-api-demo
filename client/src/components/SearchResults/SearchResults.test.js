import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_SEARCH } from '../../actions';
import { SearchResults } from './';

const cards = [{ id: 1, name: 'Reachman Shaman', set: 'Test' }];

jest.mock('react-redux');
jest.mock('react-scroll-up-button');
jest.mock('react-lazy-load-image-component', () => ({
  LazyLoadImage: () => <div />,
  trackWindowScroll: component => component
}));
jest.spyOn(global, 'fetch').mockImplementation(
  () => (async () => ({
    json: async () => ({
      cards,
      nextPageUrl: '/api/cards?page=2'
    })
  }))()
);

describe('SearchResults', () => {
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);

  beforeEach(() => {
    dispatch.mockClear();
  });

  test('displays the heading if using a search term', async () => {
    useSelector.mockReturnValueOnce({
      cards: [],
      loading: false,
      nextPageUrl: '/api/cards?page=2',
      searchTerm: 'Vivec'
    });
    render(<SearchResults />);
    expect(await screen.findByText(/Results for/i)).toBeTruthy();
  });

  test('displays the loading animation when loading', async () => {
    useSelector.mockReturnValueOnce({
      cards: [],
      loading: true,
      nextPageUrl: '/api/cards?page=2',
      searchTerm: ''
    });
    render(<SearchResults />);
    expect(await screen.findByTestId('loadingPlaceholder')).toBeTruthy();
  });

  test('displays the clear link if using a search term', async () => {
    useSelector.mockReturnValueOnce({
      cards: [],
      loading: false,
      nextPageUrl: '/api/cards?page=2',
      searchTerm: 'Vivec'
    });
    render(<SearchResults />);
    expect(await screen.findByText('Clear')).toBeTruthy();
  });

  test('clicking the clear link clears the search', async () => {
    useSelector.mockReturnValueOnce({
      cards: [],
      loading: false,
      nextPageUrl: '/api/cards?page=2',
      searchTerm: 'Vivec'
    });
    render(<SearchResults />);
    const clearLink = await screen.findByText('Clear');
    fireEvent.click(clearLink);
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: CLEAR_SEARCH }))
    });
  });
});
