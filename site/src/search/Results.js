import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import ResultCard from './ResultCard';
import './Results.css';

const Results = ({ results, status }) => {
  const renderResults = () => {
    let result;
    switch (status) {
      case 'loading':
        result = <ReactLoading type='bars' color='lightblue'/>
        break;

      case 'complete':
        if (!results || !results.length)
          result = (<p>No results found.</p>);
        else {
          result = results.map(
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
            ));
        }
        break;

      // catches 'error' case and anything else
      default:
        result = (<p>Sorry, something went wrong. Try a different query!</p>);
        break;
    }
    return result;
  };

  return (
    <div className="results-container">
      {renderResults()}
    </div>
  );
}

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    distance: PropTypes.number,
    rating: PropTypes.number,
    url: PropTypes.string
  })).isRequired,
  status: PropTypes.string.isRequired
};

export default Results;