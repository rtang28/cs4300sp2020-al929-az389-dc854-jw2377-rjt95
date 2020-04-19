import React from 'react';

const ResultCard = ({ name, distance }) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="card-title">
                        <h5 className="card-title mb-0">{name}</h5>
                    </div>
                    <div className="score">
                        score: {distance}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultCard;