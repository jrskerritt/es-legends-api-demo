import React from 'react';
import ReactLoading from 'react-loading';
import './LoadingPlaceholder.css';

export function LoadingPlaceholder() {
  return (
    <div className="loading-placeholder" data-testid="loadingPlaceholder">
      <ReactLoading type="bars" color="#e6e6e6" height="120px" width="250px" />
    </div>
  );
}
