import React from 'react';
import ResultCard from './ResultCard';
import PropTypes from 'prop-types';
import './Results.css'

const Results = ({ results }) => {
  return (
    <div className="results-container">
      {results && results.map(
        (result) => (
          <ResultCard
            name={result.name}
            distance={result.distance}
            key={result.name}
          />
        ))}
    </div>
  );
}

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string,
    distance: PropTypes.number
  })).isRequired
};

export default Results;