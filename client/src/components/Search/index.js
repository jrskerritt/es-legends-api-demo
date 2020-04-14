import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCards } from '../../actions';
import './Search.css';

export function Search() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      // search
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
        onClick={() => {}}
      >
        Search
      </button>
    </div>
  );
}
