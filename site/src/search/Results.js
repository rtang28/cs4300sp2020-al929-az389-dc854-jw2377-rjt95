import React from 'react';
import ResultCard from './ResultCard';

const Results = ({ results }) => {
    return (
        <div className="results-container">
            {results && results.map(
                (result) => (
                    <ResultCard
                        name={result.name}
                        distance={result.distance}
                    />
                ))}
        </div>
    );
}

export default Results;