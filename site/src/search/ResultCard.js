import React from "react";
import "./ResultCard.css";

const ResultCard = ({ name, distance }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="rows">
          <div className="row1">
            <div className="card-title">
              <a
                className="card-title-link"
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.google.com"}
              >
                <h5 className="card-title-text">{name}</h5>
              </a>
            </div>
            <div className="card-rating">
              <h5 className="card-rating-text">rating placeholder</h5>
            </div>
          </div>
          <div className="row2">
            <div className="card-location">
              <h6 className="card-rating-text">location placeholder</h6>
            </div>
            <div className="card-keywords">
              <h6 className="card-keywords-text">keywords placeholder</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
