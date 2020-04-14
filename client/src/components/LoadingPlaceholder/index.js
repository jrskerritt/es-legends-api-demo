import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import './LoadingPlaceholder.css';

export function LoadingPlaceholder({ show }) {
  return (
    <div className="loading-placeholder">
      <ReactLoading type="bars" color="#333" height="100px" width="200px" />
    </div>
  );
}

LoadingPlaceholder.defaultProps = {
  show: false
};

LoadingPlaceholder.propTypes = {
  show: PropTypes.bool
};
