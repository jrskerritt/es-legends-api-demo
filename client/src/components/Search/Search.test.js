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

  test('displays the clear button if currently browsing search term results', async () => {
    useSelector.mockReturnValueOnce({ searchTerm: 'Vivec' });
    render(<Search />);
    expect(await screen.findByText('X')).toBeTruthy();
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

  test('clears the search when the clear search button is clicked', async () => {
    const searchTerm = 'Telvanni';
    render(<Search />);

    const textbox = await screen.findByPlaceholderText(/Card name/i);
    fireEvent.change(textbox, { target: { value: searchTerm } });
    await waitFor(() => screen.getByDisplayValue(searchTerm))

    fireEvent.keyPress(textbox, { key: "Enter", code: 13, charCode: 13 });
    await waitFor(() => screen.findByText('X'));

    const clearButton = await screen.findByText('X');
    fireEvent.click(clearButton);
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: CLEAR_SEARCH }));
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

  test('empties the textbox when the clear search button is clicked', async () => {
    const searchTerm = 'Telvanni';
    render(<Search />);

    // type something in the box
    const textbox = await screen.findByPlaceholderText(/Card name/i);
    fireEvent.change(textbox, { target: { value: searchTerm } });
    await waitFor(() => screen.getByDisplayValue(searchTerm))

    // fire the search, which should clear the box
    fireEvent.keyPress(textbox, { key: "Enter", code: 13, charCode: 13 });
    await waitFor(() => screen.findByText('X'));

    // put new text in the box
    fireEvent.change(textbox, { target: { value: 'woooo' } });
    await waitFor(() => screen.getByDisplayValue('woooo'))

    // press the clear button
    const clearButton = await screen.findByText('X');
    fireEvent.click(clearButton);
    await waitFor(() => {
      expect(screen.queryByDisplayValue('woooo')).toBeFalsy();
    });
  });
});
