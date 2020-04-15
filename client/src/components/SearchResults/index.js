import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import ScrollUpButton from 'react-scroll-up-button';
import { fetchCards } from '../../actions';
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

  return (
    <div className="search-results">
      {searchTerm && !loading && <h2>Results for "{searchTerm}"</h2>}
      {cards.length === 0 && !nextPageUrl && (
        <div className="search-results__empty">No results</div>
      )}
      {cards && cards.map(c => <Card key={c.id} {...c} />)}
      <ScrollUpButton />
      {loading && <LoadingPlaceholder />}
    </div>
  );
}

const trackWindowScollSearchResults = trackWindowScroll(SearchResults);
export { trackWindowScollSearchResults as SearchResults };
