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
            key={result.name}
            distance={result.distance}
            rating={result.yelp_rating}
            url={result.url}
            image_url={result.image_url}
            location={result.location}
            keywords={result.matched_categories}
          />
        ))}
    </div>
  );
}

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    distance: PropTypes.number
  })).isRequired
};

export default Results;