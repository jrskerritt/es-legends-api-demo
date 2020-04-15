import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCards } from '../../actions';
import './Search.css';

export function Search() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (!searchTerm) {
      return;
    }

    dispatch(searchCards(searchTerm));
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
