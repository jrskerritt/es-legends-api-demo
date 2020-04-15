import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import './LoadingPlaceholder.css';

export function LoadingPlaceholder() {
  return (
    <div className="loading-placeholder" data-testid="loadingPlaceholder">
      <ReactLoading type="bars" color="#e6e6e6" height="120px" width="250px" />
    </div>
  );
}

LoadingPlaceholder.defaultProps = {
  show: false
};

LoadingPlaceholder.propTypes = {
  show: PropTypes.bool
};
