import React from "react";
import "./ResultCard.css";

const ResultCard = ({ name, distance, rating, url, image_url, location, keywords }) => {
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
                href={url}
              >
                <h5 className="card-title-text">{name}</h5>
              </a>
            </div>
            <div className="card-rating">
              <h5 className="card-rating-text">Yelp Rating: {rating}</h5>
            </div>
          </div>
          <div className="row2">
            <div className="card-location">
              <h6 className="card-rating-text">{location}</h6>
            </div>
            <div className="card-keywords">
              <h6 className="card-keywords-text">{keywords ? keywords.join(", ") : ""}</h6>
            </div>
          </div>
        </div>
        <div className="image-box">
          <img src={image_url}></img>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
