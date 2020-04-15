import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import ScrollUpButton from 'react-scroll-up-button';
import { fetchCards, clearSearch } from '../../actions';
import { Card } from '../Card';
import { LoadingPlaceholder } from '../LoadingPlaceholder';
import './SearchResults.css';

function SearchResults() {
  const dispatch = useDispatch();
  const { cards, loading, nextPageUrl, searchTerm } = useSelector(state => ({
    cards: state.cards,
    loading: state.loading,
    nextPageUrl: state.nextPageUrl,
    searchTerm: state.searchTerm
  }));

  useEffect(() => {
    function handleScroll() {
      if (loading || !nextPageUrl) {
        return;
      }

      const buffer = 300;
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop > offsetHeight - buffer) {
        dispatch(fetchCards());
      }
    };

    if (!cards.length && nextPageUrl) {
      dispatch(fetchCards());
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, cards, loading, nextPageUrl]);

  const handleClear = () => {
    dispatch(clearSearch());
  };

  return (
    <div className="search-results">
      {searchTerm && !loading && (
        <>
          <div className="search-results__header">
            Results for "{searchTerm}" (
            <div
              className="search-results__clear-link"
              onClick={handleClear}
            >
              Clear
            </div>
            )
          </div>
        </>
      )}
      {cards.length === 0 && !nextPageUrl && (
        <div className="search-results__empty">No results</div>
      )}
      {cards && (
        <div className="search-results__cards">
          {cards.map(c => <Card key={c.id} {...c} />)}
        </div>
      )}
      {loading && <LoadingPlaceholder />}
      <ScrollUpButton />
    </div>
  );
}

// trackWindowScroll should be used for performance reasons when displaying
// a lot of images -- see:
// https://github.com/Aljullu/react-lazy-load-image-component#using-trackwindowscroll-hoc-to-improve-performance
const trackWindowScollSearchResults = trackWindowScroll(SearchResults);
export { trackWindowScollSearchResults as SearchResults };
