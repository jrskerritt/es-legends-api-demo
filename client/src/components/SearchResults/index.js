import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import { fetchCards } from '../../actions';
import { Card } from '../Card';
import { LoadingPlaceholder } from '../LoadingPlaceholder';
import './SearchResults.css';

function SearchResults() {
  const element = useRef();
  const dispatch = useDispatch();
  const { cards, loading } = useSelector(state => ({
    cards: state.cards,
    loading: state.loading
  }));

  useEffect(() => {
    function handleScroll() {
      if (loading) {
        return;
      }

      const buffer = 300;
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop > offsetHeight - buffer) {
        dispatch(fetchCards());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch, loading]);

  return (
    <div className="search-results" ref={element}>
      {cards.map(c => <Card key={c.id} {...c} />)}
      {loading && <LoadingPlaceholder />}
    </div>
  );
}

const trackWindowScollSearchResults = trackWindowScroll(SearchResults);
export { trackWindowScollSearchResults as SearchResults };
