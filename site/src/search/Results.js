import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import ResultCard from './ResultCard';
import './Results.css';

const Results = ({ results, status }) => {
  const renderResults = () => {
    let elementsToRender;
    switch (status) {
      case 'loading':
        elementsToRender = <ReactLoading type='bars' color='lightblue' />
        break;

      case 'complete':
        if (!results || !results.length)
          elementsToRender = (<p>No results found.</p>);
        else {
          elementsToRender = (
            <div className='results-container'>
              {results.map(result => (
                <ResultCard
                  name={result.name}
                  isGem={result.is_gem}
                  key={result.name}
                  score={result.score}
                  rating={result.yelp_rating}
                  url={result.url}
                  image_url={result.image_url}
                  location={result.location}
                  keywords={result.keywords}
                  categories={result.matched_categories}
                />
              ))}
            </div>);
        }
        break;

      // catches 'error' case and anything else
      default:
        elementsToRender = (<p>Sorry, something went wrong. Try a different query!</p>);
        break;
    }
    return elementsToRender;
  };

  return renderResults();
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