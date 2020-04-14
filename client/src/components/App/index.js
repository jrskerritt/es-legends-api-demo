import React from 'react';
import { Search } from '../Search';
import { SearchResults } from '../SearchResults';
import './App.css';

export function App() {
  return (
    <div className="app">
      <h1>The Elder Scrolls: Legends</h1>
      <h2>Search Cards</h2>
      <Search />
      <SearchResults />
    </div>
  );
}
