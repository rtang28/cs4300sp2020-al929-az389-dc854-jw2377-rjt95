import React from 'react';
import ResultCard from './ResultCard';
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

export default Results;