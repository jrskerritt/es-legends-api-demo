import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCards, clearSearch } from '../../actions';
import './Search.css';

export function Search() {
  const dispatch = useDispatch();
  const lastSearchTerm = useSelector(state => state.searchTerm);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (!searchTerm) {
      return;
    }

    dispatch(searchCards(searchTerm));
    setSearchTerm('');
  };

  const handleClear = () => {
    dispatch(clearSearch());
    setSearchTerm('');
  };

  const onKeyPress = ({ key }) => {
    if (key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search pure-form">
      <input
        type="text"
        className="pure-input"
        placeholder="Card name"
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        onKeyPress={onKeyPress}
      />
      {lastSearchTerm && (
        <div
          className="search__clear-btn"
          onClick={handleClear}
        >
          X
        </div>
      )}
      <button
        className="pure-button pure-button-primary"
        type="button"
        disabled={false}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
