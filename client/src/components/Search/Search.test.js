import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_CARDS, CLEAR_SEARCH } from '../../actions';
import { Search } from './';

jest.mock('react-redux');

describe('Search', () => {
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);
  useSelector.mockReturnValue({ searchTerm: '' });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('does not fire a new search if the search box is empty', async () => {
    render(<Search />);
    const searchButton = await screen.findByText('Search');
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  test('fires a search when the search button is clicked', async () => {
    const searchTerm = 'Telvanni';
    render(<Search />);

    const textbox = await screen.findByPlaceholderText(/Card name/i);
    fireEvent.change(textbox, { target: { value: searchTerm } });
    await waitFor(() => screen.getByDisplayValue(searchTerm))

    const searchButton = await screen.findByText('Search');
    fireEvent.click(searchButton);
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: SEARCH_CARDS }));
    });
  });

  test('fires a search when the enter key is pressed', async () => {
    const searchTerm = 'Telvanni';
    render(<Search />);

    const textbox = await screen.findByPlaceholderText(/Card name/i);
    fireEvent.change(textbox, { target: { value: searchTerm } });
    await waitFor(() => screen.getByDisplayValue(searchTerm))

    fireEvent.keyPress(textbox, { key: "Enter", code: 13, charCode: 13 });
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: SEARCH_CARDS }));
    });
  });

  test('empties the textbox when a search is fired', async () => {
    const searchTerm = 'Telvanni';
    render(<Search />);

    const textbox = await screen.findByPlaceholderText(/Card name/i);
    fireEvent.change(textbox, { target: { value: searchTerm } });
    await waitFor(() => screen.getByDisplayValue(searchTerm))

    fireEvent.keyPress(textbox, { key: "Enter", code: 13, charCode: 13 });
    await waitFor(() => {
      expect(screen.queryByDisplayValue(searchTerm)).toBeFalsy();
    });
  });
});
